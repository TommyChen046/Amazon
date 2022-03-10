import React from 'react'
import './CheckoutProduct.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import { useStateValue } from './StateProvider'

function CheckoutProduct({id, image, title, price, rating, hideButton}) { //remember to {props.value}

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => { //dispatch is an action, can be use to pull or push item from or in data layer
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })

    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct_image' 
                src={image}
                alt=''
            />
            <div className='checkoutProduct_info'>
                <p className='checkoutProduct_title'>{title}</p>
                <p className='checkoutProduct_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct_rating'>
                    {Array(rating).fill().map((_,i) => (<p><StarRateIcon className='fullStar' fontSize="small"/></p>))} {/* map is used to iterate, fill is used to fill </p> */}
                </div>
                {!hideButton && (<button onClick={removeFromBasket}>Remove from Basket</button>)}
            </div>
        </div>
    )
}

export default CheckoutProduct
