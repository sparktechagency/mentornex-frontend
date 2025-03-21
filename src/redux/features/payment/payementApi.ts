import { baseApi } from '@/redux/base/baseApi';

const paymentApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            connectStripeAccount: builder.mutation({
                  query: () => ({
                        url: '/mentor/setup-stripe',
                        method: 'POST',
                  }),
            }),
      }),
});

export const { useConnectStripeAccountMutation } = paymentApi;
