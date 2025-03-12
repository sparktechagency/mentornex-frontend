import { baseApi } from '@/redux/base/baseApi';

const termsPrivacyApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getTerms: build.query({
                  query: () => ({
                        url: '/others/termsAndConditions?type=termsAndConditions',
                        method: 'GET',
                  }),
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
            getPrivacy: build.query({
                  query: () => ({
                        url: '/others/privacyPolicy?type=privacyPolicy',
                        method: 'GET',
                  }),
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
      }),
});

export const { useGetTermsQuery, useGetPrivacyQuery } = termsPrivacyApi;
