import { baseApi } from '@/redux/base/baseApi';
import { TApiResponse, TQueryParams } from '@/types';
import { TUser } from '../user/userApi';

export type TMentor = TUser & {
      status: 'active' | 'inactive';
};

const mentorApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getAllMentors: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/list/mentors-list',
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (response: TApiResponse<TMentor[]>) => {
                        return response.data;
                  },
                  providesTags: ['Mentors'],
            }),
      }),
});

export const { useGetAllMentorsQuery } = mentorApi;
