import { baseApi } from '@/redux/base/baseApi';

const taskApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getTasks: build.query({
                  query: () => ({
                        url: '/task/get-all-task',
                        method: 'GET',
                  }),
                  providesTags: ['Tasks'],
                  transformResponse: (response: any) => {
                        return response?.data;
                  },
            }),

            createTask: build.mutation({
                  query: (task) => ({
                        url: '/task/add-task',
                        method: 'POST',
                        body: task,
                  }),
                  invalidatesTags: ['Tasks'],
            }),

            updateTask: build.mutation({
                  query: (args) => ({
                        url: `/tasks/${args.id}`,
                        method: 'PATCH',
                        body: args.data,
                  }),
                  invalidatesTags: ['Tasks'],
            }),
            deleteTask: build.mutation({
                  query: (id) => ({
                        url: `/task/delete-task/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Tasks'],
            }),
      }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
