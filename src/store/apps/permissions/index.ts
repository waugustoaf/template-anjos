import { api } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DataParams {
  q: string;
}

export const fetchData = createAsyncThunk('appPermissions/fetchData', async (params: DataParams) => {
  const response = await api.get('/apps/permissions/data', {
    params
  });

  return response.data;
});

export const appPermissionsSlice = createSlice({
  name: 'appPermissions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.permissions;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
      state.total = action.payload.total;
    });
  }
});

export default appPermissionsSlice.reducer;
