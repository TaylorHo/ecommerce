import React, { useState } from 'react';
import displayImage from '../../assets/img/img-01.png';

function AdminPanel(){

  const [configArray, setConfigArray] = useState([]);
  const [productsArray, setProductsArray] = useState([]);

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
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Ver Produtos
						</button>
					</div>

          <div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Novo Produto
						</button>
					</div>

          <div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Editar Configurações
						</button>
					</div>

					<div className="text-center top-space">
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default AdminPanel;