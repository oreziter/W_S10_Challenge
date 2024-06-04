import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
  tagTypes: ['Pizza'],
  endpoints: (builder) => ({
    getPizzaOrder: builder.query({
      query: () => 'history',
      providesTags: ['Pizza']
    }),
    createPizzaOrder: builder.mutation({
      query: (pizzaOrder) => ({
        url: 'pizza',
        method: 'POST',
        body: pizzaOrder,
      }),
      invalidatesTags: ['Pizza'],
    }),
  }),
});

export const { useGetPizzaOrderQuery, useCreatePizzaOrderMutation } = pizzaApi;