/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import axios from 'axios';
import Loading from '../components/Loading';
import CategoryCard from '../components/CategoryCard';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero />

      <h2 className='text-center text-2xl font-medium'>Recipe category list</h2>

      {loading ? (
        <Loading />
      ) : (
        <div id='recipe-list' className='flex flex-wrap justify-center'>
          {categories.map((category) => (
            <CategoryCard
              key={category.idCategory}
              title={category.strCategory}
              thumbnail={category.strCategoryThumb}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default HomePage;