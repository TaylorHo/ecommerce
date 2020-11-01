import React, { useState } from 'react';
import displayImage from '../../assets/img/img-01.png';

import Config from '../../components/Config';
import NewProduct from '../../components/NewProduct';
import ProductsList from '../../components/ProductsList';

function AdminPanel(){

  const [configArray, setConfigArray] = useState([]);
  const [productsArray, setProductsArray] = useState([]);

  const [configChoice, setConfigChoice] = useState('hidden');
  const [newProductChoice, setNewProductChoice] = useState('hidden');
  const [productsListChoice, setProductsListChoice] = useState('hidden');
  const [initialConfigChoice, setInitialConfigChoice] = useState('');

  function recebeConfiguracoes(){
    if(configArray.length === 0){
      fetch("https://indecisos.space/api/config/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setConfigArray(responseJSON);
      });
      recebeProdutos();
    }
  }

  function recebeProdutos(){
    if(productsArray.length === 0){
      fetch("https://indecisos.space/api/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setProductsArray(responseJSON);
      });
    }
  }

  function toggleHidden(qual: string){
    if(qual === 'config'){
      setConfigChoice('');
      setInitialConfigChoice('hidden');
      setProductsListChoice('hidden');
      setNewProductChoice('hidden');
    } else if (qual === 'new'){
      setNewProductChoice('');
      setConfigChoice('hidden');
      setInitialConfigChoice('hidden');
      setProductsListChoice('hidden');
    } else if (qual === 'products'){
      setProductsListChoice('');
      setNewProductChoice('hidden');
      setConfigChoice('hidden');
      setInitialConfigChoice('hidden');
    } else if (qual === 'back'){
      setInitialConfigChoice('');
      setProductsListChoice('hidden');
      setNewProductChoice('hidden');
      setConfigChoice('hidden');
    }
  }

  return (
    <div className="limiter" onLoad={recebeConfiguracoes}>
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={displayImage} alt="IMG" />
				</div>

				<div className="login100-form validate-form">
					<span className="login100-form-title">
						Painel da Loja
					</span>
					
					<div className={initialConfigChoice}>
            <div className="container-login100-form-btn">
              <button onClick={() => {toggleHidden('products')}} className="login100-form-btn">
                Editar Produtos
              </button>
            </div>

            <div className="container-login100-form-btn">
              <button onClick={() => {toggleHidden('new')}} className="login100-form-btn">
                Novo Produto
              </button>
            </div>

            <div className="container-login100-form-btn">
              <button onClick={() => {toggleHidden('config')}} className="login100-form-btn">
                Editar Configurações
              </button>
            </div>
          </div>

          <div className={configChoice}>
            <Config />
          </div>

          <div className={newProductChoice}>
            <NewProduct />
          </div>

          <div className={productsListChoice}>
            <ProductsList />
          </div>

					<div className="text-center top-space">
            <div className="text-center">
              <button onClick={() => {toggleHidden('back')}}><i className="fa fa-arrow-left"></i> Voltar</button>
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default AdminPanel;