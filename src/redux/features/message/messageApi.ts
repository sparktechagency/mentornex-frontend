import { baseApi } from '@/redux/base/baseApi';
export interface TMessage {
      isRead: boolean;
      _id: string;
      chatId: string;
      receiver: {
            _id: string;
            name: string;
            image: string;
      };
      files: string[];
      message: string;
      type: 'file' | 'text' | 'image' | 'video';
      createdAt: string;
}

export const messageApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getMessages: builder.query({
                  query: (id) => {
                        return {
                              url: `/message/${id}`,
                              method: 'GET',
                        };
                  },
                  transformResponse: (response: any) => response.data,
                  providesTags: ['Messages'],
            }),
            createMessage: builder.mutation({
                  query: (args) => ({
                        url: `/message/${args.id}`,
                        method: 'POST',
                        body: args.data,
                  }),
                  invalidatesTags: ['Messages'],
            }),
      }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
