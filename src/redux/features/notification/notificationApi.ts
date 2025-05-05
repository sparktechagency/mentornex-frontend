import { baseApi } from '@/redux/base/baseApi';

export const notificationApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getNotification: builder.query({
                  query: () => ({
                        url: '/notification',
                        method: 'GET',
                  }),
                  providesTags: ['Notification'],
            }),
            markNotificationAsRead: builder.mutation({
                  query: (id) => ({
                        url: `/notification/${id}`,
                        method: 'PATCH',
                  }),
                  invalidatesTags: ['Notification'],
            }),
      }),
});

export const { useGetNotificationQuery, useMarkNotificationAsReadMutation } = notificationApi;
