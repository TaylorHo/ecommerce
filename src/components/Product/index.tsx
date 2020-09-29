import React, { useState } from 'react';

import './styles.css';

function Product(){

  const [productPopup, setProductPopup] = useState('inactive');

  function productPopupActive() {
    setProductPopup('active');
  }

  function productPopupInactive(){
    setProductPopup('inactive');
  }

  return (
    <div className="item">

      <div className="descricao-do-produto">
        <h3>Xis Coração</h3>
        <p>Pão de xis, Coração, Ovo, Queijo Lanche, Milho, Ervilha, Alface, Tomate, Maionese, Ketchup e Mostarda.</p>
        <div className="botao-adicionar">
          <a onClick={productPopupActive}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
          <span>R$19,90</span>
        </div>
      </div>

      <div className="imagem-do-produto">
        <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/704d7202-9993-4882-a9e4-a2921097864b.jpeg" alt="product-menu"/>
      </div>

      <div className={`product-popup ${productPopup}`}>
        <div className="dados-do-popup-do-produto">
          <i onClick={productPopupInactive} className="material-icons">clear</i>
        </div>
      </div>
    </div>
  )
}

export default Product;