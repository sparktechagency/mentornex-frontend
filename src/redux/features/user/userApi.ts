import { baseApi } from '@/redux/base/baseApi';

const userApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getUserProfile: build.query({
                  query: () => {
                        return {
                              url: '/user/profile',
                              method: 'GET',
                        };
                  },
                  transformResponse: (response: any) => {
                        return response.data;
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
