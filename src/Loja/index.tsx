import React, { useState } from 'react';
import Whatsapp from '../assets/img/icons/whatsapp.svg';
import { Circle } from 'react-preloaders';

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
  const [cartArray, setCartArray] = useState([{titulo: '', preco: '', quant: 0, obs: '', id: 0, cart: 1}]);
  const [preco, setPreco] = useState('0.00');
  const [custoEntrega, setCustoEntrega] = useState('2.00');

  const [msg, setMsg] = useState('active');
  const [listagem, setListagem] = useState('inactive');

  const [envio, setEnvio] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [troco, setTroco] = useState('inactive');
  const [entrega, setEntrega] = useState('inactive');
  const [counter, setCounter] = useState(0);
  const [classe, setClasse] = useState('inactive');
  const [icone, setIcone] = useState('up');
  const [quantidade, setQuantidade] = useState(1);
  const [category, setCategory] = useState('');
  const [observacao, setObservacao] = useState('')
  const [loading, setLoading] = useState(true);

  // ================================================================== //
  // Adicionar produtos ao array do carrinho
  function addToCart(titulo: string, preco: string, quantidade: number, id: string, obs: string){
    if(cartArray[0].quant === 0){
      setCartArray([
        {titulo: titulo, preco: preco, quant: quantidade, obs: obs, id: parseInt(id), cart: 1}
      ]);
      setPreco(preco);
      setMsg('inactive');
      setListagem('active');
    } else if (cartArray[0].quant !== 0){
      setCartArray([
        ...cartArray,
        {titulo: titulo, preco: preco, quant: quantidade, obs: obs, id: parseInt(id), cart: 1}
      ]);
    }
    setObservacao('');
    setCounter(counter + quantidade);
    toggleProductPopup(id, 0);
    valorDaCompra('add', quantidade, parseFloat(preco));
  }
  // ================================================================== //

  // ================================================================== //
  // Remover produtos do array do carrinho
  function removeFromCart(position: number){
    const updatedCart = cartArray.map((produto, index) => {
      if(index === position){
        setCounter(counter - produto.quant);
        valorDaCompra('rem', produto.quant, parseFloat(produto.preco));
        return {...produto, quant: 0, obs: '', cart: 0}
      }
      return produto;
    });
    setCartArray(updatedCart);
    verificaTotalDeProdutos();
  }
  function verificaTotalDeProdutos(){
    var a = cartArray.length;
    cartArray.map((produto) => {
      if(produto.cart === 0){
        a = a - 1;
      }
      return a;
    })
    if(a <= 1){
      setMsg('active');
      setListagem('inactive');
    }
  }
  // ================================================================== //

  // ================================================================== //
  // Valor da compra
  function valorDaCompra(acao: string, quantidade: number, valorProduto: number){
    if(acao === 'add'){
      var c = parseFloat(preco) + (valorProduto * quantidade);
      setPreco(c.toFixed(2));
    } else if (acao === 'rem'){
      var c = parseFloat(preco) - (valorProduto * quantidade);
      setPreco(c.toFixed(2));
    }
  }
  // ================================================================== //

  // ================================================================== //
  // Recebe a listagem de produtos da API
  function recebeProdutos(){
    if(productsArray.length === 0){
      fetch("https://indecisos.space/api/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setProductsArray(responseJSON);
        setLoading(false);
      });
    }
  }
  // ================================================================== //

  // ================================================================== //
  // Aumenta e diminui a quantidade de produtos para adicionar ao carrinho
  // Fica no PopUp do produto
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
  // ================================================================== //

  // ================================================================== //
  // Ativa e desativa o PopUp do produto, apenas do ID específico
  function toggleProductPopup(id: String, n: number){
    var produtoPop = 'produto-' + id;
    var e = document.getElementById(produtoPop);
    if(e){(n===1 ? e.classList.remove('inactive') : e.classList.add('inactive'))}
    setQuantidade(1);
  }
  // 1 = ativa o popup
  // 0 = desativa o popup
  // ================================================================== //

  // ================================================================== //
  // Ativa e desativa a barra inferior que mostra o RESUMO DO PEDIDO
  function resumoPedido() {
    (classe==='inactive' ? setClasse('active') : setClasse('inactive'));
    (classe==='inactive' ? setIcone('down') : setIcone('up'));
  }
  // ================================================================== //

  // ================================================================== //
  // Define os métodos de envio e pagamento, de acordo com a necessidade de aparição
  function metodoDeEnvio(n: string){
    setEnvio(n);
    (n==='receber' ? setEntrega('active') : setEntrega('inactive'));
  }
  function metodoDePagamento(n: string){
    setPagamento(n);
    (n==='dinheiro' ? setTroco('active') : setTroco('inactive'));
  }
  // ================================================================== //

  const paddingTop = {
    paddingTop: (9 * 204) - 240,
  }

  return(
    <>
      <Circle customLoading={loading} />
      <header>
        <div>
          <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/Logo_Branco_Site-300x88.png" alt="Logo"/>
        </div>
      </header>
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
                      <a onClick={() => toggleProductPopup(produto.id, 1)}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
                      <span>R${produto.preco}</span>
                    </div>
                  </div>

                  <div className="imagem-do-produto">
                    <img src={produto.foto} alt="Foto do produto"/>
                  </div>

                  <div id={`produto-${produto.id}`} className="product-popup inactive">
                    <div className="dados-do-popup-do-produto">
                      <div className="fechar-popup">
                        <i onClick={() => toggleProductPopup(produto.id, 0)} className="material-icons">clear</i>
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
                          <input type="text" name="observacoes" placeholder="Observação..." value={observacao} onChange={(e) => { setObservacao(e.target.value) }}/>
                        </div>
                      </div>
                      <div className="adicionar-produto-ao-carrinho">
                        <div className="quantidade">
                          <i onClick={diminuiQuantidade} className="material-icons">remove</i>
                          <input type="text" value={quantidade} readOnly/>
                          <i onClick={aumentaQuantidade} className="material-icons">add</i>
                        </div>
                        <div className="adicionar">
                          <a onClick={() => addToCart(produto.titulo, produto.preco, quantidade, produto.id, observacao)}><i className="material-icons">add_shopping_cart</i> Adicionar</a>
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
          <div className={`det ${classe}`}>
            <div className="detalhes-do-pedido">

              <div className={`msg-do-carrinho ${msg}`}>
                  <span>Carrinho vazio, adicione produtos para iniciar o pedido.</span>
              </div>

              <div className={`listagem-de-produtos ${listagem}`}>
                {cartArray.map((produto, index) => {
                  if (produto.cart === 1){
                    return(
                      <div className="lista" key={index}>
                        <span className="dados-txt"><strong>{produto.quant}X</strong> {produto.titulo} - </span>&nbsp;
                        <span className="dados-val">R${produto.preco}&nbsp;</span><i onClick={() => removeFromCart(index)} className="far fa-trash-alt"></i>
                      </div>
                    );
                  }
                })}
              </div>

              <div className="nota-do-pedido">
                <div className="subtotal dados">
                  <span className="dados-txt">Subtotal:</span>&nbsp;
                  <span className="dados-val">R${preco}</span>
                </div>
                <div className="entrega dados">
                  <span className="dados-txt">Entrega:</span>&nbsp;
                  <span className="dados-val">R$0,00</span>
                </div>
                <div className="total dados">
                  <span className="dados-txt">Total:</span>&nbsp;
                  <span className="dados-val">R${String(parseFloat(preco).toFixed(2))}</span>
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
    </>
  )
}

export default Loja;