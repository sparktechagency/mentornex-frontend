import ChatWindow from '@/components/pages/chat/ChatWindow';

const Page = ({ params }: { params: { id: string } }) => {
      const { id } = params;
      return (
            <div>
                  <ChatWindow id={id} />
            </div>
      );
};

export default Page;
