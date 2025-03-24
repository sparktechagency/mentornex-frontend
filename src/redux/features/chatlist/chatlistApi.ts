import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

export const chatListApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getChatList: builder.mutation({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/chat',
                              method: 'GET',
                              params,
                        };
                  },
            }),
            createChat: builder.mutation({
                  query: (data) => ({
                        url: '/chat',
                        method: 'POST',
                        body: data,
                  }),
            }),
      }),
});

export const { useGetChatListMutation, useCreateChatMutation } = chatListApi;
