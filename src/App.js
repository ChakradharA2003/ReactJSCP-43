import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    // const {cartList} = this.state
    // console.log(cartList)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(product => {
        if (id === product.id) {
          return {...product, quantity: product.quantity + 1}
        }
        return null
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    // console.log(cartList)
    const indexOfProductItem = cartList.findIndex(product => {
      if (product.id === id) {
        return true
      }
      return false
    })
    console.log(indexOfProductItem)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(product => {
        if (id === product.id) {
          if (product.quantity > 1) {
            return {...product, quantity: product.quantity - 1}
          }
          // return cartList.splice(indexOfProductItem, 1)
        }
        return product
      }),
    }))
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const checkProduct = cartList.map(pro => {
      if (pro.id === product.id) {
        console.log(pro)
        return true
      }
      return false
    })
    console.log(checkProduct[0])
    if (checkProduct[0]) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(pro => {
          if (pro.id === product.id) {
            return {quantity: product.quantity + 1}
          }
          return pro
        }),
      }))
    }
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
