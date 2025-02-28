import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const backendUrl = 'http://10.0.70.50:5000';

export const baseApi = createApi({
      reducerPath: 'baseApi',
      baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/api/v1` }),
      endpoints: () => ({}),
      tagTypes: ['Users', 'Mentors', 'Mentees', 'Tasks', 'Notes', 'Sessions'],
});
