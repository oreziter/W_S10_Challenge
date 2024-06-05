// import React from 'react'
// import { Provider } from 'react-redux'
// import { store } from '../state/store'
// import OrderList from './OrderList'

// function App() {
//   return (
//     <Provider store={store}>
//       <OrderList />
//     </Provider>
//   )
// }

// export default App




import React, { useState } from 'react';
import PizzaForm from './PizzaForm'
import OrderList from './OrderList'


export default function App() {

  const [orders, setOrders] = useState([])
    

  const addOrder = (order) => {
    setOrders([...orders, { ...order, id: orders.length + 1 }])
  }


  return (
    <div id="app">
      <PizzaForm addOrder={addOrder} />
      <OrderList order={orders} />
    </div>
  )
}

