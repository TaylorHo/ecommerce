import React from 'react';
import Product from '../Product';

import './styles.css';

export var produtos = 10;

function ProductCategory(){
  return(
    <>
      <div className="categoria">
        <h2>Categoria</h2>
      </div>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </>
  )
}

export default ProductCategory;