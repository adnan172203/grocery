import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import BreadCrumb from '../Common/BreadCrumb';
import { CartContext } from '../../contexts';

const TrendingItems = ({ products }) => {
  const { search, addItem } = useContext(CartContext);

  const handleAddToCart = (item, i) => {
    let product = { ...item, id: i, quantity: 1 };

    addItem(product);
    toast.success('Added to the cart');
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='trending-items-area'>
        <div className='container'>
          <BreadCrumb title='Trending Items' />
          <div className='trending-items'>
            {products
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((product, i) => (
                <div className='item-card' key={i}>
                  <div className='item-content'>
                    <div className='item-image'>
                      <img src={product.img} alt='' />
                    </div>
                    <div className='item-details'>
                      <div className='item-title'>
                        <h3>{product.name}</h3>
                      </div>
                      <div className='item-subtitle'>
                        <p>{product.description.slice(0, 20)}</p>
                      </div>
                      <div className='item-availablity'>
                        {product.available > 10 ? (
                          <p className='available'>Available</p>
                        ) : (
                          <p>only {product.available} left</p>
                        )}
                      </div>

                      <div className='item-purchase'>
                        <ul>
                          <li>{product.price}</li>
                          <li onClick={() => handleAddToCart(product, i)}>
                            <i className='bx bx-cart-alt'></i>
                          </li>
                          <li>
                            <i className='bx bx-heart'></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingItems;
