import { baseApi } from '@/redux/base/baseApi';

const communityApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            createPost: builder.mutation({
                  query: (data) => ({
                        url: '/community/create-post',
                        method: 'POST',
                        body: data,
                  }),
                  invalidatesTags: ['Posts'],
            }),
            updatePost: builder.mutation({
                  query: (data) => ({
                        url: `/community/update-post/${data.id}`,
                        method: 'PATCH',
                        data,
                  }),
                  invalidatesTags: ['Posts'],
            }),
            deletePost: builder.mutation({
                  query: (id) => ({
                        url: `/community/delete-post/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Posts'],
            }),
            getAllPosts: builder.query({
                  query: () => ({
                        url: '/community/all-posts',
                        method: 'GET',
                  }),
                  providesTags: ['Posts'],
                  transformResponse: (response: any) => response.data,
            }),
      }),
});

export const { useCreatePostMutation } = communityApi;
