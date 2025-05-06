import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
      name: 'booking',
      initialState: {
            selectedSessionId: '',
            selectedTimeSlot: {
                  date: '',
                  day: '',
                  slotCount: 0,
                  slots: [],
            },
            selectedTime: {
                  time: '',
                  isAvailable: false,
            },
      },
      reducers: {
            addSelectedTimeSlot: (state, action) => {
                  console.log(action.payload);
                  state.selectedTimeSlot = action.payload;
            },
            addSelectedTime: (state, action) => {
                  state.selectedTime = action.payload;
            },
            addSelectedSessionId: (state, action) => {
                  state.selectedSessionId = action.payload;
            },
      },
});
export const { addSelectedTimeSlot, addSelectedTime, addSelectedSessionId } = bookingSlice.actions;
export default bookingSlice.reducer;
