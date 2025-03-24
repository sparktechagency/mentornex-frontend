import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

const noteApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getNotes: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();

                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/note',
                              method: 'GET',
                              params,
                        };
                  },
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
