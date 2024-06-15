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
        return product
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
          return this.removeCartItem(id)
        }
        return product
      }),
    }))
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const cartProduct = cartList.find(pro => {
      if (pro.id === product.id) {
        return true
      }
      return false
    })
    console.log(cartProduct)
    if (cartList.includes(cartProduct)) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (cartProduct.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    // console.log(id)
    const {cartList} = this.state
    const filteredCartList = cartList.filter(product => product.id !== id)
    // console.log(filteredCartList)
    this.setState({
      cartList: filteredCartList,
    })
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
