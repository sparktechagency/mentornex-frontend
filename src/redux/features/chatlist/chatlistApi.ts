import { baseApi } from '@/redux/base/baseApi';

export const chatListApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getChatList: builder.query({
                  query: () => {
                        return {
                              url: '/chat',
                              method: 'GET',
                        };
                  },
                  transformResponse: (response: any) => response.data,
                  providesTags: ['ChatList'],
            }),
            createChat: builder.mutation({
                  query: (data) => ({
                        url: '/chat',
                        method: 'POST',
                        body: data,
                  }),
                  invalidatesTags: ['ChatList'],
            }),
      }),
});

export const { useGetChatListQuery, useCreateChatMutation } = chatListApi;
