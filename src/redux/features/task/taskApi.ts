import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

const taskApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            getTasks: build.query({
                  query: (args) => {
                        const params = new URLSearchParams();

                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/task',
                              method: 'GET',
                              params,
                        };
                  },
                  providesTags: ['Tasks'],
                  transformResponse: (response: any) => {
                        return response?.data;
                  },
            }),
            submitTask: build.mutation({
                  query: (args) => ({
                        url: `/task/submit-task/${args.id}`,
                        method: 'POST',
                        body: args.data,
                  }),
                  invalidatesTags: ['Tasks'],
            }),
            getSubmittedTask: build.query({
                  query: (id) => ({
                        url: `/task/submit/${id}`,
                        method: 'GET',
                  }),
                  providesTags: ['Tasks'],
                  transformResponse: (response: any) => {
                        return response?.data;
                  },
            }),

            getTaskById: build.query({
                  query: (id) => ({
                        url: `/task/${id}`,
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

            taskFeedback: build.mutation({
                  query: (args) => ({
                        url: `/task/feedback/${args.id}`,
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

export const {
      useGetTasksQuery,
      useCreateTaskMutation,
      useUpdateTaskMutation,
      useDeleteTaskMutation,
      useGetSubmittedTaskQuery,
      useTaskFeedbackMutation,
      useGetTaskByIdQuery,
      useSubmitTaskMutation,
} = taskApi;
