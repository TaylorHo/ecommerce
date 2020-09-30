import React, { useState } from 'react';

import './styles.css';

function Product(){

  const [productPopup, setProductPopup] = useState('inactive');
  const [quantidade, setQuantidade] = useState(0);

  function aumentaQuantidade(){
    var quant = quantidade + 1;
    setQuantidade(quant);
  }

  function diminuiQuantidade(){
    if (quantidade !== 0){
      var quant = quantidade - 1;
      setQuantidade(quant);
    }
  }

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
        <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/704d7202-9993-4882-a9e4-a2921097864b.jpeg"/>
      </div>

      <div className={`product-popup ${productPopup}`}>
        <div className="dados-do-popup-do-produto">
          <div className="fechar-popup">
            <i onClick={productPopupInactive} className="material-icons">clear</i>
          </div>
          <div className="conteudo-do-popup-do-produto">
            <h3 className="title">Xis Coração</h3>
            <div className="imagem-do-popup">
              <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/704d7202-9993-4882-a9e4-a2921097864b.jpeg"/>
            </div>
            <div className="descricao-do-produto">
              <p>Pão de xis, Coração, Ovo, Queijo Lanche, Milho, Ervilha, Alface, Tomate, Maionese, Ketchup e Mostarda.</p>
            </div>
            <div className="observacoes">
              <input type="text" name="observacoes" placeholder="Observação..."/>
            </div>
          </div>
          <div className="adicionar-produto-ao-carrinho">
            <div className="quantidade">
              <i onClick={diminuiQuantidade} className="material-icons">remove</i>
              <input type="text" value={quantidade} readOnly/>
              <i onClick={aumentaQuantidade} className="material-icons">add</i>
            </div>
            <div className="adicionar">
              <a onClick={productPopupActive}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;