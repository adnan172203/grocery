import React from 'react';
import SearchBar from '../components/Common/SearchBar';
import CheckoutProduct from '../components/Checkout/CheckouProduct';
import axios from 'axios';

const checkout = ({ products }) => {
  return (
    <>
      <SearchBar />
      <CheckoutProduct products={products} />
    </>
  );
};

export default checkout;

export async function getServerSideProps({ query }) {
  let type = query.type ? query.type : 'all';

  let url = `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${type}`;
  let response = await axios.get(url);

  return {
    props: {
      products: response.data,
    },
  };
}
