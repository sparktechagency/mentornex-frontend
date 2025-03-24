import { baseApi } from '@/redux/base/baseApi';

const chatListApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getChatList: builder.mutation({
                  query: (params) => ({
                        url: '/chat',
                        method: 'GET',
                        params,
                  }),
            }),
      }),
});

export const { useGetChatListMutation } = chatListApi;
