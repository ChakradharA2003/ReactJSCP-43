// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      /* eslint-disable no-console */
      /* eslint-disable no-restricted-syntax */
      for (const product of cartList) {
        totalAmount += product.quantity * product.price
      }
      console.log(totalAmount)
      return (
        <div className="cart-summary-container">
          <div>
            <h1 className="order-total">
              Order Total:{' '}
              <span className="total-amount">Rs {totalAmount}/- </span>
            </h1>
            <p className="cart-count">{cartList.length} items in cart</p>
          </div>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
