import { baseApi } from '@/redux/base/baseApi';

const contactApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            sendContact: build.mutation({
                  query: (data) => ({
                        url: '/contact/contact-us',
                        method: 'POST',
                        body: data,
                  }),
            }),
      }),
});

export const { useSendContactMutation } = contactApi;
