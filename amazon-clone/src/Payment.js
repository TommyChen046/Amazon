import React, {useState, useEffect} from 'react'
import './Payment.css'
import {useStateValue} from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import {Link, useNavigate} from 'react-router-dom'
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer';
import axios from './axios'
import {db} from './firebase'
import { doc, setDoc } from "firebase/firestore";


function Payment() {

    const[ {basket, user}, dispatch ] = useStateValue();
    
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState(true) //pass a request ? to stripe 


    /* When the basket changes, makes the request to Stripe to update clientSecret*/
    useEffect(()=> { // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios ({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${parseInt(getBasketTotal(basket) * 100)}` //without parseInt may be some accuracy issue
            })
            setClientSecret(response.data.clientSecret) //becasue we send a post request so we will get back a json object
        }
        getClientSecret();
    }, [basket]) //run when basket change 

    console.log('The Secret is >>>', clientSecret)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)  //CardElement is on the bottom of the page
            }
        }).then(({ paymentIntent }) =>{ //paymentIntent, what stripe will give back (paymentIntent = payment confirmation )
            
            setDoc( doc(db, 'users', user?.uid, 'orders', paymentIntent.id), { //NoSQL database //sytax is firebase v9
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created //give us the timestamp when the payment is created
            })
                
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true }) //becasue I dont want user to come back to payment page, so swap the page
        })
    }

    const handleChange = e => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details 
        setDisabled(e.empty); //if the event is empty, then disable the button
        setError(e.error ? e.error.message : ""); //if there is an error, shows errors; otherwise show nothing
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items</Link>) {/* the display difference between link and navigator is there will be underline on the link(if it is a string) */}
                </h1>

                {/* Payment Section - Delivery Address */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>17637, Pittsburgh, PA</p>
                    </div>
                </div>

                {/* Payment Section - Review Items */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review itmes and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item =>(
                            <CheckoutProduct 
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Section - Payment method */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        {/* Stripe will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment_priceContainer'>
                                <CurrencyFormat 
                                    renderText={(value) =>(
                                            <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={ processing || disabled || succeeded }>
                                    <span> {processing ? <p>Processing</p> : 'Buy Now'} </span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
