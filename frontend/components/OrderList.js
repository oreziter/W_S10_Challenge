import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderHistory, setFilter } from '../state/slices/orderHistorySlice'


export default function OrderList() {
  const [filter, setFilter] = useState('All')
  const dispatch = useDispatch()
  
  // Fetch order history on component mount
  useEffect(() => {
    dispatch(fetchOrderHistory())
  }, [dispatch])

  // Get the orders, status, and error from Redux store
  const orders = useSelector(state => state.orderHistory.orders)

  // Filter orders based on the selected filter
  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => {
          return (
            <li key={order.id}>
              <div>
                {order.customer} ordered a size {order.size} with {order.toppings ? order.toppings.length : 'no'} toppings.
              </div>
            </li>
          )
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter${size === filter ? ' active' : ''}`
          return (
            <button 
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => setFilter(size)}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}

