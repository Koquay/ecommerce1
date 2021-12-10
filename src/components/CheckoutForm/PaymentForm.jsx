import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken, nextStep, backStep}) => {
    const handleSubmit = async (event, elements, stripe)  => {}

    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant='h6' getterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>{({elements, stripe}) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement/>
                        <br/><br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='outlined' onClick={backStep}>Back</Button>
                        </div>
                    </form>
                )}</ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
