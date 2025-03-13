import { createSlice } from '@reduxjs/toolkit';

const mentorFilterSlice = createSlice({
      name: 'mentorFilter',
      initialState: {
            searchText: '',
            sort: 'newest',
            tools: [],

            language: [],
            minPrice: 0,
            maxPrice: 1000,
      },
      reducers: {
            setSearchText: (state, action) => {
                  state.searchText = action.payload;
            },

            setSort: (state, action) => {
                  state.sort = action.payload;
            },

            setTools: (state, action) => {
                  state.tools = action.payload;
            },

            setLanguage: (state, action) => {
                  state.language = action.payload;
            },

            setPrice: (state, action) => {
                  state.minPrice = action.payload.min;
                  state.maxPrice = action.payload.max;
            },
            reset: (state) => {
                  state.searchText = '';
                  state.sort = 'default';
                  state.tools = [];

                  state.language = [];
                  state.minPrice = 0;
                  state.maxPrice = 1000;
            },
      },
});

export const { setSearchText, setSort, setTools, setLanguage, setPrice, reset } = mentorFilterSlice.actions;
export default mentorFilterSlice.reducer;
