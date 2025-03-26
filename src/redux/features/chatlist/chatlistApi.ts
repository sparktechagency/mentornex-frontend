import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

export const chatListApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getChatList: builder.query({
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
