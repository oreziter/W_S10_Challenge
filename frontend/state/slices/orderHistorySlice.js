import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk for fetching order history
export const fetchOrderHistory = createAsyncThunk('orderHistory/fetchOrderHistory', async () => {
  const response = await axios.get('http://localhost:9009/api/pizza/history')
  return response.data
})

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: {
    orders: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.orders = action.payload
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default orderHistorySlice.reducer
