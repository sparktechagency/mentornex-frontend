import { baseApi } from '@/redux/base/baseApi';

const billingApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            addBilling: build.mutation({
                  query: () => ({
                        url: '/mentor/setup-stripe',
                        method: 'POST',
                  }),
            }),
            loginStripe: build.mutation({
                  query: (data) => ({
                        url: `/mentor/create-stripe-login-link`,
                        method: 'POST',
                        data: data.body,
                  }),
            }),
      }),
});

export const { useAddBillingMutation, useLoginStripeMutation } = billingApi;
