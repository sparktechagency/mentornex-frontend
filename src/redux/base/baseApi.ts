import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const baseApi = createApi({
      reducerPath: 'baseApi',
      baseQuery: fetchBaseQuery({
            baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
            prepareHeaders: (headers, { getState }) => {
                  const { token } = (getState() as RootState).auth;
                  if (token) {
                        headers.set('Authorization', `Bearer ${token}`);
                  }
                  headers.set('ngrok-skip-browser-warning', 'true');
            },
      }),
      endpoints: () => ({}),
      tagTypes: [
            'Users',
            'Mentors',
            'Mentees',
            'Tasks',
            'Notes',
            'Sessions',
            'Wishlist',
            'Content',
            'Subscriptions',
            'Packages',
            'ChatList',
            'Messages',
            'Todos',
            'Posts',
            'Comments',
            'Purchase',
      ],
});
