import React, { useEffect, useState } from 'react'
import ProductGrid from '../../components/productGrid/ProductGrid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { domain, useSearch } from '../../store';

export default function CategoryItems() {
 const { searchValue, setSearchValue } = useSearch();
  const params = useParams();
  const[products, setProducts] = useState([]);
  const[catName, setCatName] = useState('');
  const getCategory = () => {
    let catId = params.categoryId;
    let url = domain + `/api/categories/${catId}`;
    axios.get(url, { params: { populate: { items: { populate: '*' } } } }).then((res) => {
      setProducts(res.data.data.items)
      setCatName(res.data.data.name)
      console.log(products);
    });
  }
  useEffect(() => {
    getCategory();
  }, [params]);

  useEffect(() => {
    if(searchValue){ let url = domain + `/api/items`;
    axios.get(url, { params: { populate:'*' ,
    filters: {
      name: {
        $contains: searchValue,
      },
    }
    } }).then((res) => {
      setProducts(res.data.data)
      setCatName('Results')
      console.log(products);
    });}
   else{getCategory()}
  }, [searchValue]);
  return (
    <ProductGrid pageTitle={catName} products={products} domain={domain}/>
  )
}
