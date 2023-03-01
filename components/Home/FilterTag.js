import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FilterTag = () => {
  const [type, setType] = useState('');
  const router = useRouter();

  const newType = async (cat) => {
    setType(cat);
  };

  useEffect(() => {
    if (type) {
      router.push(`/?type=${type}`);
    }
  }, [type]);

  return (
    <>
      <div className='filtertag-area'>
        <div className='container'>
          <ul>
            <li onClick={(e) => newType('all')}>All Items</li>
            <li onClick={(e) => newType('drinks')}>Drinks</li>
            <li onClick={(e) => newType('fruit')}>Fruits</li>
            <li onClick={(e) => newType('bakery')}>Bakery</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilterTag;
