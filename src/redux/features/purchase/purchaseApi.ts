import { baseApi } from '@/redux/base/baseApi';

const purchaseApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            purchaseSubscription: builder.mutation({
                  query: (args) => ({
                        url: `/purchase/subscription/${args.id}`,
                        method: 'POST',
                  }),
                  invalidatesTags: ['Purchase'],
            }),

            purchasePayPerSession: builder.mutation({
                  query: (args) => ({
                        url: `/purchase/pay-per-session/${args.id}`,
                        method: 'POST',
                  }),
                  invalidatesTags: ['Purchase'],
            }),

            purchasePackage: builder.mutation({
                  query: (args) => ({
                        url: `/purchase/package/${args.id}`,
                        method: 'POST',
                  }),
                  invalidatesTags: ['Purchase'],
            }),
            cancelSubscription: builder.mutation({
                  query: (args) => {
                        return {
                              url: `/purchase/cancel-subscription/${args.id}`,
                              method: 'POST',
                        };
                  },
                  invalidatesTags: ['Purchase'],
            }),

            getSubscriptionPackages: builder.query({
                  query: () => ({
                        url: '/purchase/all-package-and-subscription',
                        method: 'GET',
                  }),
                  providesTags: ['Purchase'],
                  transformResponse: (response: any) => response.data,
            }),
      }),
});

export const {
      usePurchaseSubscriptionMutation,
      useCancelSubscriptionMutation,
      usePurchasePayPerSessionMutation,
      usePurchasePackageMutation,
      useGetSubscriptionPackagesQuery,
} = purchaseApi;
