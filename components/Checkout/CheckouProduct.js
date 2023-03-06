import { useContext } from 'react';
import { CartContext } from '../../contexts';
import toast, { Toaster } from 'react-hot-toast';

import BreadCrumb from '../Common/BreadCrumb';
import CheckoutCalculation from './CheckoutCalculation';

const CheckoutProduct = () => {
  const { cart, updateQuantity, removeItem } = useContext(CartContext);

  const incrementQuantity = (itemId, newQuantity) => {
    const item = cart.find((item) => item.id === itemId);
    if (newQuantity <= item.available && newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
    // updateQuantity(itemId, newQuantity);
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

  let totalPrice = cart.reduce(
    (acc, item) => acc + item.price.slice(1) * item.quantity,
    0
  );

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='checkout-product-area'>
        <div className='container'>
          <BreadCrumb />
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
                        <span>{item.quantity}</span>
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
                      <p>only {item.available - item.quantity} left</p>
                      {item.name === 'Coca-Cola' && item.quantity > 6 ? (
                        <div className='free-item'>
                          <div className='free-item-image'>
                            <span>
                              <img src={item.img} alt='' />
                            </span>
                          </div>
                          <p>1 Free Can Added</p>
                        </div>
                      ) : (
                        ''
                      )}
                      {item.name === 'Croissants' && item.quantity > 3 ? (
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
                    <p>£{Math.ceil(item.price.slice(1) * item.quantity)}.00</p>
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

          <CheckoutCalculation totalPrice={totalPrice} />
        </div>
      </div>
    </>
  );
};

export default CheckoutProduct;
