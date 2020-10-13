import React, { useState } from 'react';
import Whatsapp from '../assets/img/icons/whatsapp.svg';

import './styles.css';

interface productProps {
  id: string;
  titulo: string;
  foto: string;
  preco: string;
  detalhes: string;
  categoria: string;
}

function Loja(){

  const [productsArray, setProductsArray] = useState([]);

  const [envio, setEnvio] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [troco, setTroco] = useState('inactive');
  const [entrega, setEntrega] = useState('inactive');
  const [counter, setCounter] = useState(0);
  
  const [classe, setClasse] = useState('inactive');
  const [icone, setIcone] = useState('up');

  const [quantidade, setQuantidade] = useState(1);

  const [category, setCategory] = useState('');

  var jaExecutada = false;
  function recebeProdutos(){
    if(jaExecutada === false){
      fetch("https://indecisos.space/api/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setProductsArray(responseJSON)
      });
    }
    jaExecutada = true;
  }

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

  function productPopupActivator(id: String) {
    var produtoPop = 'produto-' + id;
    var e = document.getElementById(produtoPop);
    if(e){
      e.classList.remove('inactive');
      e.classList.add('active');
    }
  }

  function productPopupDeactivator(id: String){
    var produtoPop = 'produto-' + id;
    var e = document.getElementById(produtoPop);
    if(e){
      e.classList.remove('active');
      e.classList.add('inactive');
    }
  }

  function adicionaProduto(id: String){
    configProducts();
    setQuantidade(1);
    productPopupDeactivator(id);
  }

  function resumoPedido() {
    if (classe === 'inactive') {
      setClasse('active');
      setIcone('down');
    } else if (classe === 'active') {
      setClasse('inactive');
      setIcone('up');
    }
  }

  function configProducts(){
    setCounter(counter + quantidade);
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

  return(
      <main onLoad={recebeProdutos}>

        <div id="pagina" className="pagina" style={paddingTop}>
        <div className="separador-topo"></div>
          <div className="select-block">
              <select value={category} name="categorias" onChange={(e) => { setCategory(e.target.value) }}>
                  <option value="" disabled hidden >Categoria</option>
                  <option value="categoria-01">Categoria 01</option>
                  <option value="categoria-02">Categoria 02</option>
                  <option value="categoria-03">Categoria 03</option>
                  <option value="categoria-04">Categoria 04</option>
                  <option value="categoria-05">Categoria 05</option>
              </select>
          </div>

          <div className="produtos">
            <div className="categoria">
            <h2>Categoria</h2>
            </div>
            {productsArray.map((produto: productProps) => {
              return (
                <div className="item" key={produto.id}>
                  <div className="descricao-do-produto">
                    <h3>{produto.titulo}</h3>
                    <p>{produto.detalhes}</p>
                    <div className="botao-adicionar">
                      <a onClick={() => productPopupActivator(produto.id)}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
                      <span>R${produto.preco}</span>
                    </div>
                  </div>

                  <div className="imagem-do-produto">
                    <img src={produto.foto} alt="Foto do produto"/>
                  </div>

                  <div id={`produto-${produto.id}`} className="product-popup inactive">
                    <div className="dados-do-popup-do-produto">
                      <div className="fechar-popup">
                        <i onClick={() => productPopupDeactivator(produto.id)} className="material-icons">clear</i>
                      </div>
                      <div className="conteudo-do-popup-do-produto">
                        <h3 className="title">{produto.titulo}</h3>
                        <div className="imagem-do-popup">
                          <img src={produto.foto} alt="Foto do produto"/>
                        </div>
                        <div className="descricao-do-produto">
                          <p>{produto.detalhes}</p>
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
                          <a onClick={() => adicionaProduto(produto.id)}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
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
                <a href="#"><img src={Whatsapp}  alt="Whatsapp"/> Realizar Pedido</a>
              </div>

            </div>
          </div>
        </div>

      </main>
  )
}

export default Loja;