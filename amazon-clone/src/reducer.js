export const initialState = {
    basket: [],
    user: null //for auth in App.js onAuthStateChanged()
};

//Selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0); // a way to do looping sum //this item should be equal to {item in dispatch in Product.js}


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return{
                ...state, //return the state 
                basket: [...state.basket, action.item], //but change the basket
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => 
                basketItem.id === action.id //once find the id is equal to action( click remove button ), then return                 
            );
            
            //console.log(`id is :${index}`);

            let newBasket = [...state.basket]

            if(index >= 0) { //find it
                newBasket.splice(index, 1); //splice(start, deleteCount)
            } else { //not found
                console.warn(`Cant remove product (id: ${action.id}) as its not in basket!`)
            }
            return {
                ...state, //return current state
                basket: newBasket
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user //action.user is set in App.js in dispatch()
            }

        case 'EMPTY_BASKET':
            return{
                ...state,
                basket: []
            }
            
        default:
            return state;
    }
};



export default reducer;