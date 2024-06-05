import { configureStore } from '@reduxjs/toolkit'
import orderHistoryReducer from './slices/orderHistorySlice'
import pizzaFormReducer from './slices/pizzaFormSlice'

export const resetStore = () => configureStore({
  reducer: {
    example: (state = { count: 0 }) => state,
    orderHistory: orderHistoryReducer,
    pizzaForm: pizzaFormReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    // If using RTK Query for your networking: add your middleware here
    // If using Redux Thunk for your networking: you can ignore this
  )
})

export const store = resetStore()

