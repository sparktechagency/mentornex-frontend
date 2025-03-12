import { baseApi } from '@/redux/base/baseApi';
import { TApiResponse } from '@/types';

export type TIndustry = {
      _id: string;
      name: string;
      description: string;
      image: string;
      status: string;
      createdAt: string;

      mentorCount: number;
};

const industryApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getIndustries: build.query({
                  query: () => ({
                        url: '/industry',
                        method: 'GET',
                  }),
                  transformResponse: (response: TApiResponse<TIndustry[]>) => {
                        return response.data;
                  },
            }),
      }),
});

export const { useGetIndustriesQuery } = industryApi;
