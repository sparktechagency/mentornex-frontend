import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

export type TFaq = {
      _id: string;
      question: string;
      answer: string;
};
const faqApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getFaqs: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/faq',
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
      }),
});

export const { useGetFaqsQuery } = faqApi;
