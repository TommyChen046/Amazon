import React from 'react';
import './Home.css';
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            <div className='home_container'>
                <img
                    className='home_image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />
                <div className='home_row'>
                    {/* Product Component*/}
                    {/* Product Component*/}
                    {/* Product Component*/}
                    <Product 
                        id='60400439' //id will impact the implement of action: removeFromBasket
                        title='The Coldest Winter: America and the Korean War Paperback – Illustrated, September 1, 2008'
                        price={15.29}
                        image='https://m.media-amazon.com/images/P/0786888628.01._SCLZZZZZZZ_SX500_.jpg'
                        rating={5}
                    /> 
                    <Product 
                        id='77594839'
                        title='KitchenAid KSM150PSER Artisan Tilt-Head Stand Mixer with Pouring Shield, 5-Quart, Empire Red'
                        price={429.95}
                        image='https://m.media-amazon.com/images/I/81MwLpSn9GL._AC_SL1500_.jpg' 
                        rating={5} 
                    />
                    <Product
                        id='5940038' 
                        title='Samsung Galaxy S10, 128GB, Prism Black - Unlocked (Renewed)' 
                        price={257.99}
                        image='https://m.media-amazon.com/images/I/71cQllfqhoL._AC_SL1500_.jpg' 
                        rating={4} 
                    />
                </div>
                <div className='home_row'>
                    <Product
                        id='14512549' 
                        title='Echo Dot (4th Gen, 2020 release) | Our most popular smart speaker with Alexa | Charcoal'
                        price={34.99}
                        image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430060cv1d.jpg'
                        rating={4}
                    /> 
                    <Product 
                        id='512549'
                        title='Apple iPad Pro Tablet (128GB, Wi-Fi, 9.7in) Rose (Renewed)'
                        price={349.99}
                        image='https://m.media-amazon.com/images/I/91QlrgIeLOL._AC_SL1500_.jpg'
                        rating={5}
                    />  
                    <Product
                        id='348893' 
                        title='The North Face Mens Chilkat IV Insulated Snow Boot'
                        price={114.95}
                        image='https://www.enwild.com/mm5/graphics/00000001/tnf-mens-chilkat-iv-black-grey.jpg'
                        rating={4}
                    />
                    <Product 
                        id='294456893'
                        title='mDesign Tall Dresser Storage Tower Stand - Sturdy Steel Frame, Wood Top, 4 Drawer Easy Pull Fabric Bin' 
                        price={49.99}
                        image='https://m.media-amazon.com/images/I/61fQK2RlaRL._AC_SL1000_.jpg' 
                        rating={5} 
                    /> 
                </div>
                <div className='home_row'>
                    <Product 
                        id='89456893'
                        title='SAMSUNG 49" Odyssey Neo G9 G95NA Gaming Monitor, 4K UHD Mini LED Display, Curved Screen, 240Hz, 1ms, G-Sync and FreeSync Premium Pro, LS49AG952NNXZA, White'
                        price={2299.99}
                        image='https://m.media-amazon.com/images/I/81gf+wgrcfS._AC_SL1500_.jpg'
                        rating={4}
                    /> 
                </div>
            </div>
        </div>
    )
}

export default Home;
