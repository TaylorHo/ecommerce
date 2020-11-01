import React, { useState } from 'react';
import MD5 from 'crypto-js/md5';

import displayImage from '../../assets/img/img-01.png';
import './styles.css';

function Login(){

  const [pass, setPass] = useState('');
  const [adminPass, setAdminPass] = useState('');
	const [tentativas, setTentativas] = useState(0);
	const [hidden, setHidden] = useState('hidden');
	const [max, setMax] = useState('hidden');

  function recebeConfiguracoes(){
    if(adminPass === ''){
      fetch("https://indecisos.space/api/config/")
      .then((response) => response.json())
      .then((responseJSON) => {
        setAdminPass(responseJSON[5].valor);
      });
		}
		var t = localStorage.getItem('tentativas');
		if(t){setTentativas(parseInt(t));}
  }

  function passEncrypt(password: string){
    setPass((MD5(password)).toString());
	}
	
	function verificacao(){
		var date = new Date();
		if(adminPass === pass){
			localStorage.setItem('accessTime', (date.getTime()).toString());
			document.location.reload();
		} else if (tentativas < 5){
			setHidden('');
			setTentativas(tentativas + 1);
			localStorage.setItem('tentativas', tentativas.toString());
		} else {
			localStorage.setItem('esperar', (date.getTime()).toString());
			setHidden('hidden');
			setMax('');
		}
	}

  const verify = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		var date = new Date();
		var tempo = localStorage.getItem('esperar');
		if(tempo){
			var esperar = Math.abs(date.getTime() - parseInt(tempo));
			if(esperar > (30 * 60000)){
				verificacao();
			} else {
				setMax('');
			}
		} else {
			verificacao();
		}
  }

  return (
    <div className="limiter" onLoad={recebeConfiguracoes}>
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-pic js-tilt" data-tilt>
					<img src={displayImage} alt="IMG" />
				</div>

				<form className="login100-form validate-form">
					<span className="login100-form-title">
						Painel da Loja
					</span>

					<div className={`alert alert-danger text-center ${hidden}`}>
						Senha incorreta! Você tem mais {6 - tentativas} tentativas restantes.
					</div>

					<div className={`alert alert-danger text-center ${max}`}>
						Número máximo de tentativas atingido. Tente novamente mais tarde.
					</div>

					<div className="wrap-input100">
						<input className="input100" type="password" onChange={(e) => {passEncrypt(e.target.value)}} name="pass" placeholder="Senha de Acesso" />
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={verify}>
							Entrar
						</button>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
							Esqueceu a senha?&nbsp;
						</span>
						<a className="txt2" href="#">
							Solicitar Alteração
						</a>
					</div>

					<div className="text-center top-space">
					</div>
				</form>
			</div>
		</div>
	</div>
  );
}

export default Login;