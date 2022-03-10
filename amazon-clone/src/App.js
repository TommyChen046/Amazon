import React, {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe('pk_test_51KF2UELhfVwZHjibh7lbNgXZPTevnPuh9CRRTl4VgQVbOHwQHnyUqujEwUxAKNrWlRca8j2u30Uoa8TdFuAIYrt000ytmqUOi6');

function App() {

const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads, think about like a if statement
    onAuthStateChanged(auth, authUser => { //when auth state change, touch the listener
      console.log('The user is >>>', authUser);
      if(authUser) { //if user is logged in, shoot user into data layer(user in reducer.js, which default is null)
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else { //if user is logged out
        dispatch({
          type: 'SET_USER',
          user: null //gentle remove user
        })
      }
    })
  }, [])

  return (
      // BEM naming convention building step -> {/* 1.Header */} {/* 2.Home */}
    <Router>
      <div className="app">
        <Routes> {/* Switch is replaced by Routes */}
          <Route path="/login" element={ <Login /> }/>
          <Route path="/checkout" element={ <><Header /><Checkout /></> } /> {/* just a demo to show the syntax if multi elements are rendered */}
          <Route path="/payment" element={ <><Header /><Elements stripe={promise}><Payment /></Elements></> } />
          <Route path="/orders" element={ <><Header /><Orders /></> } />
          <Route path="*" element={ <><Header /><Home /></> } /> {/*path="*" is a default route in react-router v6 and default root should at the bottom*/ }
        </Routes>
      </div>
    </Router>
    );
}

export default App;
