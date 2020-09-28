import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductCategory, {produtos} from '../components/ProductCategory';

import './styles.css';

function Loja(){
  
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

  const paddingTop = {
    paddingTop: (produtos * 202.6) - 240,
  }

  return(
    <>
      <header>
        <div>
          <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/Logo_Branco_Site-300x88.png" alt=""/>
        </div>
      </header>

      <main>

        <div id="pagina" className="pagina" style={paddingTop}>
          <CategorySelector />

          <div className="produtos">
            <ProductCategory />
          </div>
        </div>

        <div className="resumo-do-pedido">
          <div className="topo-do-pedido" onClick={resumoPedido}>
            <div className="counter">
              0
            </div>
            <div className="titulo">
              Resumo do Pedido
            </div>
            <div className="ir-ao-topo">
              <i className="material-icons">{`keyboard_arrow_${icone}`}</i>
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