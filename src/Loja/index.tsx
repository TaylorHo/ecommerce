import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import Whatsapp from '../assets/img/icons/whatsapp.svg';
import { ProductsList } from '../services/api';
import Product, {productProps} from '../components/Product';

import './styles.css';

function Loja(){

  localStorage.clear();

  const [envio, setEnvio] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [troco, setTroco] = useState('inactive');
  const [entrega, setEntrega] = useState('inactive');
  const [counter, setCounter] = useState(0);
  
  const [classe, setClasse] = useState('inactive');
  const [icone, setIcone] = useState('up');

  function resumoPedido() {
    if (classe === 'inactive') {
      setClasse('active');
      setIcone('down');
      configProducts();
    } else if (classe === 'active') {
      setClasse('inactive');
      setIcone('up');
    }
  }

  function configProducts(){
    if (localStorage.getItem('carrinho')){
      var carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      for (var i = 0; i < carrinho.length; i++){
        setCounter(counter + carrinho[i].quant);
      }
    }
  }

  function metodoDeEnvio(n: string){
    setEnvio(n);
    if (n === 'receber'){
      setEntrega('active');
    } else {
      setEntrega('inactive');
    }
  }

  function metodoDePagamento(n: string){
    setPagamento(n);
    if (n === 'dinheiro'){
      setTroco('active');
    } else {
      setTroco('inactive');
    }
  }

  const paddingTop = {
    paddingTop: (9 * 204) - 240,
  }

  const data = ProductsList();

  return(
      <main>

        <div id="pagina" className="pagina" style={paddingTop}>
          <CategorySelector />

          <div className="produtos">
            <div className="categoria">
            <h2>Categoria</h2>
            </div>
            {data.map((produto: productProps) => {
              return <Product key={produto.id} data={produto} />
            })}
          </div>
        </div>

        <div className="resumo-do-pedido">
          <div className="topo-do-pedido" onClick={resumoPedido}>
            <div className="counter">
              {counter}
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
                  <span className="dados-txt">Subtotal:</span>&nbsp;
                  <span className="dados-val">R$0,00</span>
                </div>
                <div className="entrega dados">
                  <span className="dados-txt">Entrega:</span>&nbsp;
                  <span className="dados-val">R$0,00</span>
                </div>
                <div className="total dados">
                  <span className="dados-txt">Total:</span>&nbsp;
                  <span className="dados-val">R$0,00</span>
                </div>
              </div>

              <div className="detalhes">
                <div className="title">
                  <span>Detalhes do Pedido</span>
                </div>
                <div className="metodo-de-envio">
                  <select value={envio} name="retirar-ou-receber" onChange={(e) => metodoDeEnvio(e.target.value)}>
                    <option value="" disabled hidden >Retirar ou Receber?</option>
                    <option value="retirar">Retirar Pessoalmente</option>
                    <option value="receber">Receber por Delivery</option>
                  </select>
                  <div className={entrega}>
                    <div className="endereco">
                      <i className="material-icons">create</i>
                      <a href="#">&nbsp;Editar Endereço</a>
                    </div>
                    <div className="metodo-de-pagamento">
                      <select value={pagamento} name="metodos-de-pagamento" onChange={(e) => metodoDePagamento(e.target.value)}>
                        <option value="" disabled hidden >Método de Pagamento</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="credito">Cartão de Crédito</option>
                        <option value="debito">Cartão de Débito</option>
                      </select>
                      <div className={`troco ${troco}`}>
                        <input type="number" placeholder="Troco para"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fixed-bottom">
                <a href="#"><img src={Whatsapp} /> Realizar Pedido</a>
              </div>

            </div>
          </div>
        </div>

      </main>
  )
}

export default Loja;