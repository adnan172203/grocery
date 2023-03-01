import Link from 'next/link';

const CheckoutCalculation = ({ totalPrice }) => {
  return (
    <>
      <div className='checkout-calculation'>
        <div className='checkout-subtotal'>
          <div className='checkout-subtotal-details'>
            <h3>Subtotal</h3>
            <p>£{Math.ceil(totalPrice)}</p>
          </div>
        </div>
        <div className='checkout-discount'>
          <div className='checkout-discount-details'>
            <h3>Discount</h3>
            <p>£0.00</p>
          </div>
        </div>
        <div className='checkout-total'>
          <div className='checkout-total-details'>
            <h3>Total</h3>
            <p>£{Math.ceil(totalPrice)}</p>
            <Link href='/place-order'>
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutCalculation;
