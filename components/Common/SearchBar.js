import { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../contexts';
import Link from 'next/link';

const SearchBar = () => {
  const router = useRouter();
  const { cart, setSearch, search } = useContext(CartContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (search) {
      router.push('/');
    }
  };

  return (
    <>
      <div className='searchbar-area'>
        <header>
          <div className='container'>
            <div className='searchbar'>
              <div className='searchbar-logo'>
                <Link href='/'>
                  <h3>GROCERIES</h3>
                </Link>
              </div>

              <div className='search-box'>
                <form onSubmit={submitHandler}>
                  <input
                    type='text'
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>

              <div className='user-cart-item'>
                <ul className='user-cart-item-list'>
                  <li className='user-cart-heart'>
                    <i className='bx bx-heart'></i>
                  </li>
                  <li className='user-cart-avatar'>
                    <img src='../images/icon/avatar.png' alt='' />
                  </li>
                  <li className='user-cart-icon'>
                    <p>{cart.length}</p>
                    <Link href='/checkout'>
                      <i className='bx bxs-cart-alt'></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default SearchBar;
