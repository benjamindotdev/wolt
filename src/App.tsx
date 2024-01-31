import { useState } from 'react'
import './App.css'

function App() {

  const [cartValue, setCartValue] = useState(0.00);
  const [distance, setDistance] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [time, setTime] = useState('');

  const [valueSurcharge, setValueSurcharge] = useState(0);
  const [distanceSurcharge, setDistanceSurcharge] = useState(0);
  const [itemsSurcharge, setItemsSurcharge] = useState(0);
  const [timeSurcharge, setTimeSurcharge] = useState(false);

  const [showSurcharges, setShowSurcharges] = useState(false);

  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const calculateCartValue = (cartValue: number) => {
    setDeliveryPrice(cartValue)
    if (cartValue < 10) {
      setValueSurcharge(10-cartValue);
    }
  }

  const calculateDistance = (distance: number) => {
      setDeliveryPrice(2);
      setDistanceSurcharge(Math.floor((distance-1000)/500));
  }

  const calculateItems = (cartItems: number) => {
    if (cartItems > 4) {
      setItemsSurcharge((cartItems-4)*0.5);
    }
  }

  const calculateTime = () => {
    const timeZone = new Date().getTimezoneOffset();
    const date = new Date();
    const hours = date.getHours();
    setTime(`${hours+Math.floor(timeZone/60)}:${date.getMinutes()}, ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`);
    if (time >= '15:00' && time <= '19:00') {
      setTimeSurcharge(true);
    }
  }

  const calculateDeliveryPrice = () => {
    calculateCartValue(cartValue);
    calculateDistance(distance);
    calculateItems(cartItems);
    calculateTime();
    setShowSurcharges(true);
    setDeliveryPrice(deliveryPrice + valueSurcharge + distanceSurcharge + itemsSurcharge)
    timeSurcharge && setDeliveryPrice(deliveryPrice * 1.2);
    deliveryPrice > 15 ? setDeliveryPrice(15) : '';
    cartValue > 200 ? setDeliveryPrice(0) : '';
  }

  const reset = () => {
    setCartValue(0.00);
    setDistance(0);
    setCartItems(0);
    setTime('');
    setValueSurcharge(0);
    setDistanceSurcharge(0);
    setItemsSurcharge(0);
    setTimeSurcharge(false);
    setShowSurcharges(false);
    setDeliveryPrice(0);
  }

  return (
    <div className='calculator'>
      <h1 className='title'>Delivery fee calculator</h1>
      <div className='input__row'>
        <label htmlFor='cartValue'>Cart value</label>
        <input
          type='number'
          id='cartValue'
          value={cartValue}
          onChange={(e) => setCartValue(parseFloat(parseFloat(e.target.value).toFixed(2)))}
        />
        <label htmlFor='cartValue'>€</label> 
      </div>
      <div className='input__row'>
        <label htmlFor='distance'>Delivery distance</label>
        <input
          type='number'
          id='distance'
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
        />
        <label htmlFor='distance'>m</label>
      </div>
      <div className='input__row'>
        <label htmlFor='cartItems'>Amount of items</label>
        <input
          type='number'
          id='cartItems'
          value={cartItems}
          onChange={(e) => setCartItems(parseInt(e.target.value))}
        />
      </div>
      <div className='input__row'>
        <label htmlFor='time'>Time</label>
        <p>{time}</p>
      </div>
      {
        deliveryPrice > 0
        ? <button
            className='calculate__button'
            onClick={reset}
          >
            Reset
          </button>
        : <button
            className='calculate__button'
            onClick={calculateDeliveryPrice}
          >
            Calculate delivery price
          </button>
      }
      
      <div className='input__row result'>
        <p>Delivery price: </p>
        <p>{deliveryPrice}</p>
        <p>€</p>
      </div>
      <div className='surcharges'>
        {showSurcharges && (
          <div>
            {
              valueSurcharge > 0 && deliveryPrice !== 0 &&
                <div className='input__row'>
                  <p>Cart value surcharge: </p>
                  <p>{valueSurcharge}</p>
                  <p>€</p>
                </div>
            }
            {
              distanceSurcharge > 0 && deliveryPrice !== 0 &&
                <div className='input__row'>
                  <p>Distance surcharge: </p>
                  <p>{distanceSurcharge}</p>
                  <p>€</p>
                </div>
            }
            {
              itemsSurcharge > 0 && deliveryPrice !== 0 &&
                <div className='input__row'>
                  <p>Items surcharge: </p>
                  <p>{itemsSurcharge}</p>
                  <p>€</p>
                </div>
            }
            {
              timeSurcharge && deliveryPrice !== 0 &&
                <div className='input__row'>
                  <p>Time surcharge: </p>
                  <p>x</p>
                  <p>1.2</p>
                </div>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default App