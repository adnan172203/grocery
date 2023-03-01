import SearchBar from '../components/Common/SearchBar';
import FilterTag from '../components/Home/FilterTag';
import TrendingItems from '../components/Home/TrendingItems';
import axios from 'axios';

export default function Home({ products }) {
  return (
    <>
      <SearchBar />
      <FilterTag />
      <TrendingItems products={products} />
    </>
  );
}

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
