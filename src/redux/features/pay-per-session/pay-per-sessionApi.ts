import { baseApi } from '@/redux/base/baseApi';

const payPerSessionApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addPayPerSession: builder.mutation({
                  query: (perPerSession) => ({
                        url: '/plans/pay-per-session',
                        method: 'POST',
                        body: perPerSession,
                  }),
                  invalidatesTags: ['Packages', 'Subscriptions'],
            }),

            updatePayPerSession: builder.mutation({
                  query: ({ id, perPerSession }) => ({
                        url: `/plans/pay-per-session/${id}`,
                        method: 'PATCH',
                        body: perPerSession,
                  }),
                  invalidatesTags: ['Packages', 'Subscriptions'],
            }),

            deletePayPerSession: builder.mutation({
                  query: (id) => ({
                        url: `/plans/pay-per-session/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Packages', 'Subscriptions'],
            }),
      }),
});

export const { useAddPayPerSessionMutation, useUpdatePayPerSessionMutation, useDeletePayPerSessionMutation } = payPerSessionApi;
