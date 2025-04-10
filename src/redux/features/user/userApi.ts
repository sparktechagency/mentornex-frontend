import { TApiResponse } from './../../../types/index';
import { baseApi } from '@/redux/base/baseApi';
export type TSocial = {
      platform: string;
      username: string;
};
export type TUser = {
      _id: string;
      name: string;
      role: 'MENTOR' | 'MENTEE';
      startingPrice: number;
      rating: number;
      topRated: boolean;
      email: string;
      industry: string;
      timeZone: string;
      password: string;
      phone: string;
      about: string;
      bio: string;
      instagram_url: string;
      facebook_url: string;
      linkedin_url: string;
      twitter_url: string;
      website_url: string;
      isConnected: boolean;
      content: string;

      expertise: string[];
      focus_area: string;
      language: string[];
      job_title: string;
      company_name: string;
      education: string;
      institution_name: string;
      country: string;
      social: TSocial[];
      image?: string;
      banner?: string;
      status: 'active' | 'inactive' | 'delete';
};

const userApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getUserProfile: build.query({
                  query: () => {
                        return {
                              url: '/user/profile',
                              method: 'GET',
                        };
                  },
                  transformResponse: (TApiResponse: TApiResponse<TUser>) => {
                        return TApiResponse.data;
                  },
                  providesTags: ['Users'],
            }),
            registerUser: build.mutation({
                  query: (data) => {
                        return {
                              url: '/user/signup',
                              method: 'POST',
                              body: data,
                        };
                  },
            }),
            updateUserProfile: build.mutation({
                  query: (data) => {
                        return {
                              url: '/user/profile',
                              method: 'PATCH',
                              body: data,
                        };
                  },
                  invalidatesTags: ['Users'],
            }),
      }),
});

export const { useGetUserProfileQuery, useRegisterUserMutation, useUpdateUserProfileMutation } = userApi;
