import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

const menteeApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getMyMentees: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: `/mentor/mentees`,
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (response: any) => {
                        return response?.data;
                  },
            }),
      }),
});

export const { useGetMyMenteesQuery } = menteeApi;
