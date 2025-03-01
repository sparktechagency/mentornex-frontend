import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const backendUrl = 'http://10.0.70.50:5000';

export const baseApi = createApi({
      reducerPath: 'baseApi',
      baseQuery: fetchBaseQuery({
            baseUrl: `${backendUrl}/api/v1`,
            prepareHeaders: (headers, { getState }) => {
                  const { token } = (getState() as RootState).auth;
                  if (token) {
                        headers.set('Authorization', `Bearer ${token}`);
                  }
            },
      }),
      endpoints: () => ({}),
      tagTypes: ['Users', 'Mentors', 'Mentees', 'Tasks', 'Notes', 'Sessions'],
});
