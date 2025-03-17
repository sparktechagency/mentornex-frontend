import { baseApi } from '@/redux/base/baseApi';

const authApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            loginUser: build.mutation({
                  query: (data) => {
                        return {
                              url: '/auth/login',
                              method: 'POST',
                              body: data,
                        };
                  },
            }),
            verifyEmail: build.mutation({
                  query: (data) => {
                        return {
                              url: '/auth/verify-email',
                              method: 'POST',
                              body: data,
                        };
                  },
            }),
            forgetPassword: build.mutation({
                  query: (data) => {
                        return {
                              url: '/auth/forget-password',
                              method: 'POST',
                              body: data,
                        };
                  },
            }),
            resetPassword: build.mutation({
                  query: (data) => {
                        return {
                              url: '/auth/reset-password',
                              method: 'POST',
                              body: data,
                              headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `${localStorage.getItem('oneTimeToken')}`,
                              },
                        };
                  },
            }),
            changePassword: build.mutation({
                  query: (data) => {
                        return {
                              url: '/auth/change-password',
                              method: 'POST',
                              body: data,
                        };
                  },
            }),
            deleteAccount: build.mutation({
                  query: (data) => {
                        return {
                              url: '/auth/delete-profile',
                              method: 'DELETE',
                              body: data,
                        };
                  },
            }),
      }),
});
export const {
      useLoginUserMutation,
      useVerifyEmailMutation,
      useForgetPasswordMutation,
      useResetPasswordMutation,
      useChangePasswordMutation,
      useDeleteAccountMutation,
} = authApi;
