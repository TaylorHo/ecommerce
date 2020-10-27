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
  const [configArray, setConfigArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [cartArray, setCartArray] = useState([{titulo: '', preco: '', quant: 0, obs: '', id: 0, cart: 1}]);
  const [preco, setPreco] = useState('0.00');
  const [custoEntrega, setCustoEntrega] = useState('0.00');
  const [valEntrega, setValEntrega] = useState('');
  const [contato, setContato] = useState('')

  const [msg, setMsg] = useState('active');
  const [listagem, setListagem] = useState('inactive');

  const [logo, setLogo] = useState('');
  const [cor, setCor] = useState('');

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

  const [trocoVal, setTrocoVal] = useState('');
  const [classeAdd, setClasseAdd] = useState('')
  const [classeAdd2, setClasseAdd2] = useState('')

  const [popupEntrega, setPopupEntrega] = useState('inactive');
  const [popupDados, setPopupDados] = useState('inactive');

  const [nome, setNome] = useState('');
  const [tel, setTel] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [ref, setRef] = useState('');
  const [bairro, setBairro] = useState('');

  const [enderecoEntrega, setEnderecoEntrega] = useState({nome: '', tel: '', cidade: '', rua: '', ref: '', bairro: ''});

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
      setPreco((parseFloat(preco) + (valorProduto * quantidade)).toFixed(2));
    } else if (acao === 'rem'){
      setPreco((parseFloat(preco) - (valorProduto * quantidade)).toFixed(2));
    }
  }
  // ================================================================== //
  function alteraConfig(array: any){
    var title = array[0].valor;
    if (document.title !== title) {
      document.title = title;
    }
    setLogo(array[1].valor);
    setCor(array[2].valor);
    setValEntrega(array[4].valor);
    setContato(array[3].valor);
    recebeProdutos();
  }

  // ================================================================== //
  // Recebe a listagem de produtos da API
  function recebeConfiguracoes(){
    if(configArray.length === 0){
      fetch("https://indecisos.space/api/config/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setConfigArray(responseJSON);
        alteraConfig(responseJSON);
      });
    }
  }

  function recebeProdutos(){
    if(productsArray.length === 0){
      fetch("https://indecisos.space/api/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setProductsArray(responseJSON);
        defineCategorias(responseJSON);
        setLoading(false);
      });
    }
  }
  // ================================================================== //

  // Salva um array de categorias
  function defineCategorias(array: any){
    var t: any[] = [];
    const cat = array.map((p: any) => {
      if (t.indexOf(p.categoria) === -1){
        t.push(p.categoria);
        return p.categoria;
      } else {
        return 0;
      }
    });
    setCategoryArray(cat);
  }

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
    (classe==='inactive' ? setClasseAdd('o') : setClasseAdd(''));
    (classe==='inactive' ? setClasseAdd2('a') : setClasseAdd2(''));
  }
  // ================================================================== //

  // ================================================================== //
  // Define os métodos de envio e pagamento, de acordo com a necessidade de aparição
  function metodoDeEnvio(n: string){
    setEnvio(n);
    (n==='receber' ? setEntrega('active') : setEntrega('inactive'));
    (n==='receber' ? setCustoEntrega(valEntrega) : setCustoEntrega('0.00'));
  }
  function metodoDePagamento(n: string){
    setPagamento(n);
    (n==='dinheiro' ? setTroco('active') : setTroco('inactive'));
  }
  // ================================================================== //

  // ================================================================== //
  // Função do botão REALIZAR PEDIDO
  function montaLink(tipo: string){
    // adicionar os produtos no link
    var produtos = '';
    cartArray.map((produto) => {
      if(produto.cart === 1){
        if(produto.obs === ''){
          var obs = 'Nenhuma';
        } else {
          var obs = produto.obs;
        }
        if(produtos === ''){
          produtos = produto.titulo + ':' + produto.quant + ':' + produto.preco + ':' + obs;
        } else {
          produtos = produtos + ',' + produto.titulo + ':' + produto.quant + ':' + produto.preco + ':' + obs;
        }
      }
    })

    var add = '&total=' + (parseFloat(preco) + parseFloat(custoEntrega)).toFixed(2);

    if(tipo === 'retirar'){
      var caminho = '?produtos=' + produtos + '&entrega=' + envio + '&nome=' + nome + '&tel=' + tel + add + '&contato=' + contato;
      window.location.href="https://indecisos.space/api/msg/" + caminho;
    } else if (tipo === 'delivery'){
      var caminho = '?produtos=' + produtos + '&entrega=' + envio + '&nome=' + nome + '&tel=' + tel + '&cidade=' + cidade + '&rua=' + rua + '&numero=' + numero + '&ref=' + ref + '&bairro=' + bairro + '&pagamento=' + pagamento + add + '&contato=' + contato;
      if(pagamento === 'dinheiro'){
        window.location.href='https://indecisos.space/api/msg/' + caminho + '&troco=' + trocoVal;
      } else {
        window.location.href="https://indecisos.space/api/msg/" + caminho;
      }
    }
  }

  function linkRetirar(){
    if(nome !== '' && tel !== ''){
      montaLink('retirar');
    } else {
      alert('Preencha os dados necessários');
    }
  }

  function redirectEnvio(){
    if(envio === 'receber'){
      if(enderecoEntrega.nome !== '' && enderecoEntrega.tel !== '' && enderecoEntrega.cidade !== '' &&enderecoEntrega.rua !== '' && enderecoEntrega.bairro !== ''){
        if (pagamento !== ''){
          montaLink('delivery');
        } else {
          alert('Selecione um meio de pagamento');
        }
        
      } else {
        setPopupEntrega('active');
      }
    } else if(envio === 'retirar'){
      setPopupDados('active');
    } else {
      alert('Você precisa selecionar os detalhes do pedido.');
    }
  }

  function salvaEndereco(){
      setEnderecoEntrega({nome, tel, cidade, rua, ref, bairro});
      setPopupEntrega('inactive');
  }
  // ================================================================== //

  function categorias(categoria: string){
    setCategory(categoria);
    window.location.href='#'+ categoria;
  }

  return(
    <>
      <Circle customLoading={loading} />
      <header>
        <div>
          <img src={logo} alt="Logo"/>
        </div>
      </header>
      <style>:root{`{--color-primary: ${cor}}`}</style>
      <div className="main" onLoad={recebeConfiguracoes}>

        <div id="pagina" className="pagina">
          <div className="separador-topo"></div>
          <div className="select-block">
              <select value={category} name="categorias" onChange={(e) => { categorias(e.target.value) }}>
                  <option value="" disabled hidden >Categoria</option>
                  {categoryArray.map((cat: any) => {
                    if(cat !== 0){
                      return <option key={cat} value={cat}>{cat}</option>
                    }
                  })}
              </select>
          </div>

          <div className="produtos">
            {categoryArray.map((cat: any) => {
              if(cat !== 0){
                return (
                  <div key={cat}>
                  <div className="marcador" id={cat}></div>
                  <div className="categoria">
                    <h2>{cat}</h2>
                  </div>
                  {productsArray.map((produto: productProps) => {
                    if(cat !== 0 && cat === produto.categoria){
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
                    }
                })}
                </div>
                )
              }
            })}
          </div>
        </div>

        <div className="resumo-do-pedido">
          <div className={`topo-do-pedido ${classeAdd}`} onClick={resumoPedido}>
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
          <div className={`det ${classe} ${classeAdd2}`}>
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
                  <span className="dados-val">R${custoEntrega}</span>
                </div>
                <div className="total dados">
                  <span className="dados-txt">Total:</span>&nbsp;
                  <span className="dados-val">R${(parseFloat(preco) + parseFloat(custoEntrega)).toFixed(2)}</span>
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
                      <a onClick={() => setPopupEntrega('active')}>&nbsp;Editar Endereço</a>
                    </div>
                    <div className="metodo-de-pagamento">
                      <select value={pagamento} name="metodos-de-pagamento" onChange={(e) => metodoDePagamento(e.target.value)}>
                        <option value="" disabled hidden >Método de Pagamento</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="credito">Cartão de Crédito</option>
                        <option value="debito">Cartão de Débito</option>
                      </select>
                      <div className={`troco ${troco}`}>
                        <input type="number" value={trocoVal} placeholder="Troco para" onChange={(e) => setTrocoVal(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="popups-de-entrega">
                <div className={`popup product-popup ${popupEntrega}`}>
                  <div className="fechar-popup">
                    <i onClick={() => setPopupEntrega('inactive')} className="material-icons">clear</i>
                  </div>
                  <h2 className="title">Endereço e dados</h2>
                  <input type="text" value={nome} placeholder="Nome Completo" onChange={(e) => setNome(e.target.value)}/>
                  <input type="text" value={tel} placeholder="Telefone" onChange={(e) => setTel(e.target.value)}/>
                  <input type="text" value={cidade} placeholder="Cidade/Município" onChange={(e) => setCidade(e.target.value)}/>
                  <input type="text" value={rua} placeholder="Rua" onChange={(e) => setRua(e.target.value)}/>
                  <input type="text" value={numero} placeholder="Número" onChange={(e) => setNumero(e.target.value)}/>
                  <input type="text" value={ref} placeholder="Apto, ponto de ref. (opcional)" onChange={(e) => setRef(e.target.value)}/>
                  <input type="text" value={bairro} placeholder="Bairro" onChange={(e) => setBairro(e.target.value)}/>
                  <button onClick={salvaEndereco}>Feito</button>
                </div>
                <div className={`popup product-popup ${popupDados}`}>
                  <div className="fechar-popup">
                    <i onClick={() => setPopupDados('inactive')} className="material-icons">clear</i>
                  </div>
                  <h2>Dados de Contato</h2>
                  <input type="text" value={nome} placeholder="Nome Completo" onChange={(e) => setNome(e.target.value)}/>
                  <input type="text" value={tel} placeholder="Telefone" onChange={(e) => setTel(e.target.value)}/>
                  <button onClick={linkRetirar}><img src={Whatsapp}  alt="Whatsapp"/> Realizar Pedido</button>
                </div>
              </div>

              <div className="fixed-bottom">
                <a onClick={redirectEnvio}><img src={Whatsapp}  alt="Whatsapp"/> Realizar Pedido</a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Loja;