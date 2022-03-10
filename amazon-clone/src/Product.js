import React from 'react'
import './Product.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import { useStateValue } from './StateProvider';

function Product({id, title, image, price, rating}) {
    
    const [state, dispatch] = useStateValue(); //push(dispatch) data item into data layer

    const addToBasket = () =>{
        // dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };
    
    return (
        <div className='product'>
            <div className='product_info'> {/* product container */}
                <p>{title}</p>
                <p className='product_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product_rating'>
                    {Array(rating).fill().map((_,i) => (<p><StarRateIcon className='fullStar' fontSize="small"/></p>))} {/* map is used to iterate, fill is used to fill </p> */}
                </div>
            </div>

            <img
                src={image}
                alt=""
            />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
