import { useContext } from 'react';
import { CartContext } from '../../contexts';
import toast, { Toaster } from 'react-hot-toast';

import BreadCrumb from '../Common/BreadCrumb';
import CheckoutCalculation from './CheckoutCalculation';

const CheckoutProduct = ({ products }) => {
  const { cart, updateQuantity, removeItem, addItem } = useContext(CartContext);

  const coffeeItems = products.find((item) => item.name === 'Coffee');
  const croiItems = cart.find((item) => item.name === 'Croissants');

  const incrementQuantity = (itemId, newQuantity) => {
    const item = cart.find((item) => item.id === itemId);

    if (newQuantity <= item.available && newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
    if (croiItems.quantity >= 3) {
      addItem(coffeeItems);
    }
  };
  const decrementQuantity = (itemId, newQuantity) => {
    newQuantity = Math.max(newQuantity, 1);
    updateQuantity(itemId, newQuantity);
  };

  const removeCartItem = (id) => {
    removeItem(id);
    toast.success('Product Removed.', {
      style: {
        border: '1px solid #E86F6F',
        padding: '16px',
        color: '#E86F6F',
      },
      iconTheme: {
        primary: '#E86F6F',
        secondary: '#FFFAEE',
      },
    });
  };

  let subTotal = cart.reduce(
    (acc, item) => acc + item.price.slice(1) * item.quantity,
    0
  );

  //discount
  let cokeDiscount = 0;
  let coffeeDiscount = 0;

  const cokeItems = cart.find((item) => item.name === 'Coca-Cola');

  if (cokeItems && cokeItems.quantity >= 6) {
    const offerCount = Math.floor(cokeItems.quantity / 6);
    cokeDiscount = offerCount * cokeItems.price.slice(1);
    subTotal += 1;
  }
  if (croiItems && croiItems.quantity >= 3) {
    const offerCount = Math.floor(croiItems.quantity / 3);
    coffeeDiscount = offerCount * 0.65;
    subTotal += 1;
  }

  let discount = cokeDiscount + coffeeDiscount;
  let totalPrice = subTotal - discount;

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='checkout-product-area'>
        <div className='container'>
          <BreadCrumb title='Checkout' />
          <div className='checkout-products'>
            {cart.map((item, i) => (
              <div className='checkout-product-item' key={i}>
                <div className='checkout-product-content'>
                  <div className='checkout-product-image'>
                    <img src={item.img} alt='' />
                  </div>
                  <div className='checkout-product-details'>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
                <div className='responsive-cart'>
                  <div className='checkout-product-quantity'>
                    <div className='product-quantity-adjust'>
                      <span
                        className='minus-button'
                        onClick={() =>
                          decrementQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <img src='../images/icon/minus.png' alt='' />
                      </span>
                      <div className='product-quantity'>
                        {item.name === 'Coca-Cola' && item.quantity >= 6 ? (
                          <span>{item.quantity + 1}</span>
                        ) : (
                          <span>{item.quantity}</span>
                        )}
                        {/* <span>{item.quantity}</span> */}
                      </div>
                      <span
                        className='plus-button'
                        onClick={() =>
                          incrementQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <img src='../images/icon/plus.png' alt='' />
                      </span>
                    </div>
                    <div className='checkout-product-availability'>
                      {item.name === 'Coca-Cola' && item.quantity >= 6 ? (
                        <p>only {item.available - item.quantity - 1} left</p>
                      ) : (
                        <p>only {item.available - item.quantity} left</p>
                      )}
                      {/* <p>only {item.available - item.quantity} left</p> */}
                      {item.name === 'Coca-Cola' && item.quantity > 5 ? (
                        <div className='free-item'>
                          <div className='free-item-image'>
                            <span>
                              <img src={item.img} alt='' />
                            </span>
                          </div>
                          <p>1 Free Can Added</p>
                          <p className='discount-money'>£0.99</p>
                        </div>
                      ) : (
                        ''
                      )}
                      {item.name === 'Croissants' && item.quantity > 2 ? (
                        <div className='free-coffee'>
                          <div className='free-coffee-image'>
                            <span>
                              <img
                                src='../images/product/coffee-cup.jpg'
                                alt=''
                              />
                            </span>
                          </div>
                          <p>1 Free Coffee Added</p>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='checkout-product-price'>
                    <p>£{(item.price.slice(1) * item.quantity).toFixed(2)}</p>
                  </div>
                  <div
                    className='checkout-product-delete'
                    onClick={() => removeCartItem(item.id)}
                  >
                    <img src='../images/icon/delete.png' alt='' />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CheckoutCalculation
            subTotal={subTotal}
            totalPrice={totalPrice}
            discount={discount}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
