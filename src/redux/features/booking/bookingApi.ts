import { baseApi } from '@/redux/base/baseApi';

const bookingApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            bookSession: builder.mutation({
                  query: (args: any) => ({
                        url: `/session/${args.mentorId}`,
                        method: 'POST',
                        body: args.data,
                  }),
            }),
      }),
});

export const { useBookSessionMutation } = bookingApi;
