import { api } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

interface DataParams {
  q: string;
  role: string;
  status: string;
  currentPlan: string;
}

interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
}

export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await api.get('/apps/users/list', {
    params
  });

  return response.data;
});

export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await api.post('/apps/users/add-user', {
      data
    });
    dispatch(fetchData(getState().user.params));

    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await api.delete('/apps/users/delete', {
      data: id
    });
    dispatch(fetchData(getState().user.params));

    return response.data;
  }
);

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users;
      state.total = action.payload.total;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  }
});

export default appUsersSlice.reducer;
