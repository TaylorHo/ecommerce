import React from 'react';
import Login from './pages/Login';
import AdminPanel from './pages/Admin';
import './assets/styles/global.css';

function App() {
  var access = localStorage.getItem('accessTime');
  var date = new Date();
  if (access){
    if((Math.abs(date.getTime() - parseInt(access))) < (3 * 86400000)){ // máximo 3 dias de inatividade
      return <AdminPanel />
    }
  }
  return <Login />
}

export default App;
