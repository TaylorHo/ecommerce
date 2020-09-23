import React, { useState } from 'react';
import CategorySelector from '../../components/CategorySelector';

import './style.css';

function Loja() {

  const [classe, setClasse] = useState('inactive');
  const [icone, setIcone] = useState('up');

  function resumoPedido() {
    if (classe === 'inactive') {
      setClasse('active');
      setIcone('down');
    } else if (classe === 'active') {
      setClasse('inactive');
      setIcone('up');
    }
  }

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
        <div className="resumo-do-pedido" onClick={resumoPedido}>
          <div className="topo-do-pedido">
            <div className="counter">
              0
            </div>
            <div className="titulo">
              Resumo do Pedido
            </div>
            <div className="ir-ao-topo">
              <i className={`fas fa-arrow-alt-circle-${icone}`}></i>
            </div>
          </div>
          <div className={classe}>
            <div className="detalhes-do-pedido">Detalhes do pedido</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Loja;