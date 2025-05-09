import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

const bookingApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            bookSession: builder.mutation({
                  query: (args: any) => ({
                        url: `/session/${args.mentorId}`,
                        method: 'POST',
                        body: args.data,
                  }),
            }),

            updateSession: builder.mutation({
                  query: (args: any) => ({
                        url: `/session/${args.id}`,
                        method: 'PATCH',
                        body: args.data,
                  }),
                  invalidatesTags: ['Session'],
            }),

            getSession: builder.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/session/all-bookings',
                              method: 'GET',
                              params,
                        };
                  },
                  providesTags: ['Session'],
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
      }),
});

export const { useBookSessionMutation, useGetSessionQuery, useUpdateSessionMutation } = bookingApi;
