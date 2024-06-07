// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <div className="cart-summary-container">
          <div>
            <h1 className="order-total">
              Order Total: <span className="total-amount">Rs 314950/- </span>
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
