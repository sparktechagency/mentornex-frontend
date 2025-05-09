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
      isSubscribed: boolean;
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
                  providesTags: ['Mentors'],

                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
            getMentorReviews: build.query({
                  query: (id) => {
                        return {
                              url: `/review/${id}`,
                              method: 'GET',
                        };
                  },
                  transformResponse: (response: any) => {
                        return response.data;
                  },
                  providesTags: ['Mentors'],
            }),

            addReview: build.mutation({
                  query: (args) => ({
                        url: `/review/review/add/${args.mentorId}`,
                        method: 'POST',
                        body: args.data,
                  }),
            }),

            getSingleMentor: build.query({
                  query: ({ id, ...params }) => {
                        return {
                              url: `/list/mentors/${id}`,
                              method: 'GET',
                              params,
                        };
                  },
                  transformResponse: (response: any) => {
                        return response.data;
                  },
                  providesTags: ['Mentors'],
            }),

            getMyMentors: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              console.log(args);
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
                  providesTags: ['Mentors'],
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
      }),
});

export const { useGetAllMentorsQuery, useGetSingleMentorQuery, useGetMyMentorsQuery, useGetMentorReviewsQuery, useAddReviewMutation } =
      mentorApi;
