import React, {useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {commerce} from './lib/commerce';
import { Navbar, Products } from "./components";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    }

    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const response = await commerce.cart.update(lineItemId, quantity);

        setCart(response.cart)
    }

    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId)
        setCart(response.cart)
    }

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        console.log('data', data);
        setProducts(data);        
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
        console.log('cart', cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    return (
        <Router>
            <div style={{display: 'flex'}}>
                <CssBaseline/>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path='/cart'>
                        <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Route>
                    <Route exact path='/checkout'>
                        <Checkout cart={cart} order='{}' onCaptureCheckout='{}' error='{}'/>
                    </Route>
                </Switch>                              
            </div>
        </Router>
    )
}

export default App;