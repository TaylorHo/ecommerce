import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductCategory, {produtos} from '../components/ProductCategory';

import './styles.css';

function Loja(){

  const [pagamento, setPagamento] = useState('');
  
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
            <div className="detalhes-do-pedido">

              <div className="msg-do-carrinho">
                <span>Carrinho vazio, adicione produtos para iniciar o pedido.</span>
              </div>

              <div className="nota-do-pedido">
                <div className="subtotal dados">
                  <span className="dados-txt">Subtotal:</span>
                  <span className="dados-val">R$0,00</span>
                </div>
                <div className="entrega dados">
                  <span className="dados-txt">Entrega:</span>
                  <span className="dados-val">R$0,00</span>
                </div>
                <div className="total dados">
                  <span className="dados-txt">Total:</span>
                  <span className="dados-val">R$0,00</span>
                </div>
              </div>

              <div className="detalhes">
                <div className="title">
                  <span>Detalhes do Pedido</span>
                </div>
                <div className="msg-dos-detalhes">
                  <span>Pedido não iniciado. Adicione um produto para iniciar.</span>
                </div>
                <div className="endereco">
                  <i className="material-icons">create</i>
                  <a href="#">&nbsp;Editar Endereço</a>
                </div>
                <div className="metodo-de-pagamento">
                  <select value={pagamento} name="metodos-de-pagamento" onChange={(e) => { setPagamento(e.target.value) }}>
                    <option value="" disabled hidden >Método de Pagamento</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="credito">Cartão de Crédito</option>
                    <option value="debito">Cartão de Débito</option>
                  </select>
                </div>
              </div>

              <div className="fixed-bottom">
                <a href="#">Realizar Pedido</a>
              </div>

            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default Loja;