import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

export const notificationApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getNotification: builder.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/notification',
                              method: 'GET',
                              params,
                        };
                  },
                  providesTags: ['Notification'],
                  transformResponse: (response: any) => response.data,
            }),
            markNotificationAsRead: builder.mutation({
                  query: () => ({
                        url: `/notification`,
                        method: 'PATCH',
                  }),
                  invalidatesTags: ['Notification'],
            }),
      }),
});

export const { useGetNotificationQuery, useMarkNotificationAsReadMutation } = notificationApi;
