import { baseApi } from '@/redux/base/baseApi';
import { TQueryParams } from '@/types';

const todoApi = baseApi.injectEndpoints({
      endpoints: (builder) => ({
            getTodos: builder.query({
                  query: (args) => {
                        const params = new URLSearchParams();
                        if (args) {
                              args.forEach((item: TQueryParams) => {
                                    params.append(item.name, item.value);
                              });
                        }
                        return {
                              url: '/todo',
                              method: 'GET',
                              params,
                        };
                  },
                  providesTags: ['Todos'],
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
            addTodo: builder.mutation({
                  query: (todo) => ({
                        url: '/todo',
                        method: 'POST',
                        body: todo,
                  }),
                  invalidatesTags: ['Todos'],
            }),
            updateTodo: builder.mutation({
                  query: ({ id, data }) => ({
                        url: `/todo/${id}`,
                        method: 'PATCH',
                        body: data,
                  }),
                  invalidatesTags: ['Todos'],
            }),
            deleteTodo: builder.mutation({
                  query: (id) => ({
                        url: `/todo/${id}`,
                        method: 'DELETE',
                  }),
                  invalidatesTags: ['Todos'],
            }),
      }),
});

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation } = todoApi;
