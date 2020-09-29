import React from 'react';

import './styles.css';

function Product(){
  return (
    <div className="item">

      <div className="descricao-do-produto">
        <h3>Xis Coração</h3>
        <p>Pão de xis, Coração, Ovo, Queijo Lanche, Milho, Ervilha, Alface, Tomate, Maionese, Ketchup e Mostarda.</p>
        <div className="botao-adicionar">
          <a href="#"><i className="material-icons">add_shopping_cart</i> Adicionar</a>
          <span>R$19,90</span>
        </div>
      </div>

      <div className="imagem-do-produto">
        <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/704d7202-9993-4882-a9e4-a2921097864b.jpeg" alt="product-menu"/>
      </div>

    </div>
  )
}

export default Product;