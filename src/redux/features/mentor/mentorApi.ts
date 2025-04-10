import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';
import { TUser } from '../user/userApi';

export type TMentor = TUser & {
      status: 'active' | 'inactive';
      topRated: boolean;
      rating: number;
      video: string;
      totalSessionCount: number;
      repeatedUserCount: number;
      goalAchievingRate: number;
};

const mentorApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getAllMentors: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    if (item.value) {
                                          params.append(item.name, item.value);
                                    }
                              });
                        }
                        return {
                              url: '/list/mentors-list',
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (response: any) => {
                        return response.data;
                  },
                  providesTags: ['Mentors'],
            }),

            getSingleMentor: build.query({
                  query: (id: string) => ({
                        url: `/list/mentors/${id}`,
                        method: 'GET',
                  }),
                  transformResponse: (response: any) => {
                        return response.data;
                  },
                  providesTags: ['Mentors'],
            }),

            getMyMentors: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: `/mentee/mentors`,
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

export const { useGetAllMentorsQuery, useGetSingleMentorQuery, useGetMyMentorsQuery } = mentorApi;
