import Link from 'next/link';

const CheckoutCalculation = ({ subTotal, totalPrice, discount }) => {
  return (
    <>
      <div className='checkout-calculation'>
        <div className='checkout-subtotal'>
          <div className='checkout-subtotal-details'>
            <h3>Subtotal</h3>
            <p>£{Math.ceil(subTotal)}.00</p>
          </div>
        </div>
        <div className='checkout-discount'>
          <div className='checkout-discount-details'>
            <h3>Discount</h3>
            <p>£{Math.ceil(discount)}.00</p>
          </div>
        </div>
        <div className='checkout-total'>
          <div className='checkout-total-details'>
            <div className='checkout-total-details-flex'>
              <h3>Total</h3>
              <p>£{Math.ceil(totalPrice)}.00</p>
            </div>
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
