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

            addSlot: builder.mutation({
                  query: (slot) => ({
                        url: '/schedule/create-schedule',
                        method: 'POST',
                        body: slot,
                  }),
            }),
      }),
});

export const { useGetSlotsQuery, useAddSlotMutation } = slotManagementApi;
