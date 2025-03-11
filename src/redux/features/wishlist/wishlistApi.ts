import { baseApi } from '@/redux/base/baseApi';

const wishlistApi = baseApi.injectEndpoints({
      endpoints: (build) => ({
            addWishlist: build.mutation({
                  query: (data) => ({
                        url: `/mentee/favorite-mentor`,
                        method: 'POST',
                        body: data,
                  }),
                  invalidatesTags: ['Wishlist'],
            }),
            getWishlist: build.query({
                  query: () => ({
                        url: '/mentee/favorite-mentor-list',
                        method: 'GET',
                  }),
                  providesTags: ['Wishlist'],
                  transformResponse: (response: any) => {
                        return response.data;
                  },
            }),
      }),
});

export const { useAddWishlistMutation, useGetWishlistQuery } = wishlistApi;
