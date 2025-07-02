import { baseApi } from '@/redux/base/baseApi';

const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: (id) => {
        return {
          url: `/schedule?mentorId=${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response: any) => response.data,
    }),

    getAvailableSlots: builder.query({
      query: ({ mentorId, date }) => {
        return {
          url: `/schedule/available-slots/${mentorId}?date=${date}`,
          method: 'GET',
          cache: 'no-cache',
        };
      },
      transformResponse: (response: any) => response.data,
      keepUnusedDataFor: 0,
    }),

    addSlot: builder.mutation({
      query: (slot) => ({
        url: '/schedule/create-schedule',
        method: 'POST',
        body: slot,
      }),
    }),
  }),
});

export const { useGetSlotsQuery, useAddSlotMutation, useGetAvailableSlotsQuery } =
  slotManagementApi;
