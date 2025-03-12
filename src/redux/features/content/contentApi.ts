import { baseApi } from '@/redux/base/baseApi';

const contentApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getTutorialContent: build.query({
                  query: () => ({
                        url: '/content?type=tutorial',
                        method: 'GET',
                  }),
                  providesTags: ['Content'],
                  transformResponse: (response: any) => response.data,
            }),

            getIntroductoryContent: build.query({
                  query: () => ({
                        url: '/content?type=intro',
                        method: 'GET',
                  }),
                  transformResponse: (response: any) => response.data,
            }),

            createContent: build.mutation({
                  query: (body) => ({
                        url: '/content',
                        method: 'POST',
                        body,
                  }),
                  invalidatesTags: ['Content'],
            }),

            updateContent: build.mutation({
                  query: (args) => ({
                        url: `/content/${args.id}`,
                        method: 'PATCH',
                        body: args.data,
                  }),
                  invalidatesTags: ['Content'],
            }),

            deleteContent: build.mutation({
                  query: (id) => ({
                        url: `/content/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Content'],
            }),
      }),
});

export const {
      useGetTutorialContentQuery,
      useGetIntroductoryContentQuery,
      useCreateContentMutation,
      useUpdateContentMutation,
      useDeleteContentMutation,
} = contentApi;
