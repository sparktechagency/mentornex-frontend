'use client';
import { useEffect, useRef, useState } from 'react';
import {
  TMessage,
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '@/redux/features/message/messageApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getImageUrl } from '@/utils/getImageUrl';
import { Avatar, Badge, Button, Form, Input, Spin, Upload } from 'antd';
import Image from 'next/image';
import { IoIosAttach } from 'react-icons/io';
import { setSelectedChatId } from '@/redux/features/message/messageSlice';

const ChatWindow = ({ id }: { id: string }) => {
  const { isFetching } = useGetMessagesQuery(id, { skip: !id });
  const dispatch = useAppDispatch();

  const [createMessage, { isLoading }] = useCreateMessageMutation();
  const { messages } = useAppSelector((state) => state.message);
  // console.log('messagessssssssssssssssssssssssss', messages);
  const { selectedChat } = useAppSelector((state) => state.message);

  const { user } = useAppSelector((state) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(setSelectedChatId(id));
    }
    if (autoScroll && messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, autoScroll, id, dispatch]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;

      setAutoScroll(scrollHeight - (scrollTop + clientHeight) < 50);
    }
  };

  const sendMessage = async (values: any) => {
    const formData = new FormData();
    const data = {
      message: values.message,
    };

    formData.append('data', JSON.stringify(data));
    if (values.file) {
      formData.append('image', values.file.fileList[0].originFileObj);
    }
    try {
      const res = await createMessage({ id: id, data: formData }).unwrap();
      if (res.success) {
        // toast.success('Message sent successfully');
        form.resetFields();
        // Ensure we scroll to bottom after sending
        setAutoScroll(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="">
      {/* Header remains static */}
      <div className="p-4 bg-white flex items-center gap-4">
        <Badge
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '6px',
          }}
          offset={[-5, 40]}
          dot
          color="green"
        >
          <Avatar
            size={50}
            style={{ border: '1px solid gray' }}
            src={getImageUrl(selectedChat?.participant.image as string)}
          />
        </Badge>
        <h3 className="font-medium">{selectedChat?.participant.name}</h3>
      </div>

      {/* Message container with independent scrolling */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 bg-[#F5F5F6] p-4 h-[60vh] overflow-y-auto custom-scrollbar"
      >
        {isFetching ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          messages.map((msg: TMessage, index: number) => (
            <div
              key={index}
              className={`flex ${
                msg.receiver._id !== user?.id ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.receiver._id !== user?.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border text-title'
                }`}
              >
                <p>{msg.message}</p>
                {msg.files && msg.files.length > 0 && (
                  <Image
                    width={150}
                    height={150}
                    src={getImageUrl(msg.files[0])}
                    alt={'user'}
                    className="rounded w-44 my-2 h-44"
                  />
                )}
                <p className="text-xs mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form remains static at bottom */}
      <Form
        form={form}
        onFinish={sendMessage}
        name="basic"
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        className="p-4  border-t flex w-full  items-center gap-2"
      >
        <Form.Item name="file">
          <Upload accept="image/*" maxCount={1}>
            <Button shape="circle" icon={<IoIosAttach color="#9F9F9F" size={24} />} />
          </Upload>
        </Form.Item>
        <Form.Item style={{ width: '100%' }} name="message">
          <Input.Search
            style={{
              backgroundColor: '#F5F5F6',
              borderRadius: '8px',
              width: '100%',
            }}
            variant="borderless"
            placeholder="Type a message"
            allowClear
            enterButton={
              <Button style={{ width: '100%' }} htmlType="submit" type="primary">
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            }
            size="large"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChatWindow;
