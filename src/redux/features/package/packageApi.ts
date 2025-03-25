import { baseApi } from '@/redux/base/baseApi';

const packageApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            addPackage: builder.mutation({
                  query: (data) => ({
                        url: '/plans/package',
                        method: 'POST',
                        body: data,
                  }),
                  invalidatesTags: ['Subscriptions'],
            }),
            updatePackage: builder.mutation({
                  query: (data) => ({
                        url: `/plans/package/${data.id}`,
                        method: 'PATCH',
                        body: data.data,
                  }),
                  invalidatesTags: ['Subscriptions'],
            }),
            deletePackage: builder.mutation({
                  query: (id) => ({
                        url: `/plans/package/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Subscriptions'],
            }),
      }),
});

export const { useAddPackageMutation, useUpdatePackageMutation, useDeletePackageMutation } = packageApi;
