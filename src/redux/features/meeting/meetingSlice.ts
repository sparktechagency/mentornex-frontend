import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface IMeetingState {
      isInitialized: boolean;
      isJoined: boolean;
      isVideoOn: boolean;
      isAudioOn: boolean;
      isScreenShareOn: boolean;
      duration: number;
      userName: string;
}

const initialState: IMeetingState = {
      isInitialized: false,
      isJoined: false,
      isVideoOn: false,
      isAudioOn: false,
      isScreenShareOn: false,
      duration: 0,
      userName: 'John Cena',
};

const meetingSlice = createSlice({
      name: 'meeting',
      initialState,
      reducers: {
            setInitialized: (state, action: PayloadAction<boolean>) => {
                  state.isInitialized = action.payload;
            },
            setJoined: (state, action: PayloadAction<boolean>) => {
                  state.isJoined = action.payload;
            },
            setVideoOn: (state, action: PayloadAction<boolean>) => {
                  state.isVideoOn = action.payload;
            },
            setAudioOn: (state, action: PayloadAction<boolean>) => {
                  state.isAudioOn = action.payload;
            },
            setScreenShareOn: (state, action: PayloadAction<boolean>) => {
                  state.isScreenShareOn = action.payload;
            },
            incrementDuration: (state) => {
                  state.duration += 1;
            },
            resetDuration: (state) => {
                  state.duration = 0;
            },
      },
});

export const {
      setInitialized,
      setJoined,
      setVideoOn,
      setAudioOn,
      setScreenShareOn,
      incrementDuration,
      resetDuration,
} = meetingSlice.actions;

export default meetingSlice.reducer;
