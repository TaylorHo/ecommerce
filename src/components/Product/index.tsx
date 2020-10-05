import React, { useState } from 'react';

import './styles.css';

export interface productProps {
  id: number;
  titulo: string;
  foto: string;
  preco: string;
  detalhes: string;
  categoria: string;
}

interface productAll {
  data: productProps;
}

const Product: React.FC<productAll> = ({data}) => {

  const [productPopup, setProductPopup] = useState('inactive');
  const [quantidade, setQuantidade] = useState(1);

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
        <h3>{data.titulo}</h3>
        <p>{data.detalhes}</p>
        <div className="botao-adicionar">
          <a onClick={productPopupActive}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
          <span>R${data.preco}</span>
        </div>
      </div>

      <div className="imagem-do-produto">
        <img src={data.foto}/>
      </div>

      <div className={`product-popup ${productPopup}`}>
        <div className="dados-do-popup-do-produto">
          <div className="fechar-popup">
            <i onClick={productPopupInactive} className="material-icons">clear</i>
          </div>
          <div className="conteudo-do-popup-do-produto">
            <h3 className="title">{data.titulo}</h3>
            <div className="imagem-do-popup">
              <img src={data.foto}/>
            </div>
            <div className="descricao-do-produto">
              <p>{data.detalhes}</p>
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
              <a onClick={aumentaQuantidade}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;