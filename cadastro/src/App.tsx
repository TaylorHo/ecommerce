import React from 'react';
import Login from './pages/Login';
import AdminPanel from './pages/Admin';
import './assets/styles/global.css';

function App() {
  var access = localStorage.getItem('accessTime'); // pega a data do ultimo acesso
  // criar função para calcular quanto tempo se passou desde o último acesso
  if (access !== null){
    return <AdminPanel />
  }
  return <Login />
}

export default App;
