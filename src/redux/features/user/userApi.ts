import { TApiResponse } from './../../../types/index';
import { baseApi } from '@/redux/base/baseApi';
export type TUser = {
      _id: string;
      name: string;
      email: string;
      role: 'MENTOR' | 'MENTEE';
      stripeCustomerId: string;
      industry: string;
      timeZone: string;
      expertise: string[];
      language: string[];
      image: string;
      status: string;
      stripe_account_id: string;
      verified: boolean;
      social: any[];
      createdAt: string;
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
                              url: '/user',
                              method: 'PATCH',
                              body: data,
                        };
                  },
                  invalidatesTags: ['Users'],
            }),
      }),
});

export const { useGetUserProfileQuery, useRegisterUserMutation, useUpdateUserProfileMutation } = userApi;
