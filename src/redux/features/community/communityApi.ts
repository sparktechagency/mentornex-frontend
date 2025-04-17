import { baseApi } from '@/redux/base/baseApi';
import { TApiResponseWithPagination, TQueryParams } from '@/types';
export type TPost = {
      _id: string;
      title: string;
      description: string;
      image: string;
      postedBy: {
            _id: string;
            name: string;
            image: string;
      };
      replies: {
            _id: string;
            post: string;
            repliedBy: {
                  _id: string;
                  name: string;
                  image: string;
            };
            comment: string;
            repliesOfReply: any[]; // You can replace `any` with a defined type if replies are nested
            upVotes: number;
            downVotes: number;
            parentReply: string | null;
            createdAt: string;
            updatedAt: string;
            __v: number;
      }[];
      isApproved: boolean;
      upVotes: number;
      downVotes: number;
      createdAt: string;
      updatedAt: string;
      __v: number;
};

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

            votePost: builder.mutation({
                  query: (args) => ({
                        url: `/community/vote-to-post/${args.id}`,
                        method: 'POST',
                        body: args.data,
                  }),
                  invalidatesTags: ['Posts'],
            }),

            addReplayToReplay: builder.mutation({
                  query: (args) => ({
                        url: `/community/reply-to-reply/${args.id}`,
                        method: 'POST',
                        body: args.data,
                  }),
                  invalidatesTags: ['Posts'],
            }),

            getAllPosts: builder.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: `/community/all-posts`,
                              method: 'GET',
                              params,
                        };
                  },
                  providesTags: ['Posts'],
                  transformResponse: (response: TApiResponseWithPagination<TPost[]>) => response.data,
            }),
      }),
});

export const {
      useCreatePostMutation,
      useUpdatePostMutation,
      useDeletePostMutation,
      useGetAllPostsQuery,
      useVotePostMutation,
      useAddReplayToReplayMutation,
} = communityApi;
