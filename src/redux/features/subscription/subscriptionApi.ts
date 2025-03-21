import { baseApi } from '@/redux/base/baseApi';

const subscriptionApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getSubscriptions: builder.query({
                  query: (id) => ({
                        url: `/plans/pricing-plans/${id}`,
                        method: 'GET',
                  }),
                  providesTags: ['Subscriptions'],
                  transformResponse: (response: any) => response.data,
            }),
            addSubscription: builder.mutation({
                  query: (subscription) => ({
                        url: '/plans/subscription-plan',
                        method: 'POST',
                        body: subscription,
                  }),
                  invalidatesTags: ['Subscriptions'],
            }),

            updateSubscription: builder.mutation({
                  query: (args) => ({
                        url: `/plans/subscription-plan/${args.id}`,
                        method: 'PATCH',
                        body: args.data,
                  }),
                  invalidatesTags: ['Subscriptions'],
            }),
            deleteSubscription: builder.mutation({
                  query: (id) => ({
                        url: `/plans/subscription-plan/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Subscriptions'],
            }),
      }),
});

export const { useGetSubscriptionsQuery, useAddSubscriptionMutation, useUpdateSubscriptionMutation, useDeleteSubscriptionMutation } =
      subscriptionApi;
