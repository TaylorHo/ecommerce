import React from 'react';
import CategorySelector from '../../components/CategorySelector';

import './style.css';

function Loja() {
  return (
    <>
      <header>
        <div>
          <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/Logo_Branco_Site-300x88.png" alt=""/>
        </div>
      </header>
      <main>
        <div className="categorias-topo">
          <CategorySelector />
        </div>
        <div className="resumo-do-pedido">
          <div className="topo-do-pedido">
            <div className="counter">
              0
            </div>
            <div className="titulo">
              Resumo do Pedido
            </div>
            <div className="ir-ao-topo">
            <span id="ir-ao-topo">^</span>
            </div>
          </div>
          <div className="pedido">
            <div className="detalhes-do-pedido">Detalhhes do pedido</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Loja;