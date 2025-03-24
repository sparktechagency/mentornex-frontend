import { baseApi } from '@/redux/base/baseApi';

const noteApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getNotes: build.query({
                  query: () => ({
                        url: '/note/get-all-note',
                        method: 'GET',
                  }),
                  providesTags: ['Notes'],
                  transformResponse: (response: any) => {
                        return response?.data;
                  },
            }),
            createNote: build.mutation({
                  query: (note) => ({
                        url: '/note/add-note',
                        method: 'POST',
                        body: note,
                  }),
                  invalidatesTags: ['Notes'],
            }),
            // updateNote: build.mutation({
            //       query: (args) => ({
            //             url: `/note/update-note/${args.id}`,
            //             method: 'PATCH',
            //             body: args.data,
            //       }),
            //       invalidatesTags: ['Notes'],
            // }),
            // deleteNote: build.mutation({
            //       query: (id) => ({
            //             url: `/note/delete-note/${id}`,
            //             method: 'DELETE',
            //       }),
            //       invalidatesTags: ['Notes'],
            // }),
      }),
});

export const { useGetNotesQuery, useCreateNoteMutation } = noteApi;
