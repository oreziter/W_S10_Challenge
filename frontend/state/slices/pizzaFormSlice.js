import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// Async thunk for submitting a pizza order
export const submitPizzaOrder = createAsyncThunk('pizzaForm/submitPizzaOrder', async (orderData, { rejectWithValue }) => {
  try {
          console.log(orderData)
    const response = await axios.post('http://localhost:9009/api/pizza/order', orderData)
   
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const pizzaFormSlice = createSlice({
  name: 'pizzaForm',
  initialState: {
    fullName: '',
    size: '',
    toppings: [],
    status: 'idle',
    error: null
  },

  reducers: {
    setFullName: (state, action) => { state.fullName = action.payload },
    setSize: (state, action) => { state.size = action.payload },
    toggleTopping: (state, action) => {
      const topping = action.payload
      if (state.toppings.includes(topping)) {
        state.toppings = state.toppings.filter(t => t !== topping)
      } else {
        state.toppings.push(topping)
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitPizzaOrder.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitPizzaOrder.fulfilled, (state) => {
        state.status = 'succeeded'
        state.fullName = ''
        state.size = ''
        state.toppings = []
      
      })
      .addCase(submitPizzaOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.message
      })
  }
})

export const { setFullName, setSize, toggleTopping } = pizzaFormSlice.actions
export default pizzaFormSlice.reducer
