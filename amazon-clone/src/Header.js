import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase'
import { signOut } from "firebase/auth";

function Header() {

    const [{basket, user}, dispatch] = useStateValue(); //pull data item from basket (which is an array set in the initial state)

    const handleAuthentication = () => {
        if( user) {
            signOut(auth);
        }
    }

    return (
        <div className='header'> {/* container*/}
            <Link to="/">
                <img //amazon logo
                    className='header_logo' 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=''
                />
            </Link>
            
            <div className='header_search'>  {/* serach bar and search icon*/}
                <input 
                    className='header_searchInput'
                    type='text'
                />
                <SearchIcon
                    className='header_searchIcon' 
                />    
            </div>

            <div className='header_nav'> {/* navigator*/}
                <Link to={!user && "/login"}> {/* only if there is no user then go to login page */}
                <div onClick={handleAuthentication} className='header_option'> {/* option list*/}
                    <span className='header_optionLineOne'>{user ? `Hello ${user.email}` : "Hello Guest"}</span>
                    <span className='header_optionLineTwo'>{user ? "Sign Out" : "Sign In"}</span>
                </div>
                </Link>
                <Link to='/orders'>
                    <div className='header_option'> {/* option list*/}
                        <span className='header_optionLineOne'>Returns</span>
                        <span className='header_optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                <div className='header_option'> {/* option list*/}
                    <span className='header_optionLineOne'>Your</span>
                    <span className='header_optionLineTwo'>Prime</span>
                </div>
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
