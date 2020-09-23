import React from 'react';
import CategorySelector from '../../components/CategorySelector';

import './style.css';

function Loja() {
  return (
    <>
      <header>
        <div>
          <img src="https://www.criestore.com.br/wp-content/uploads/2020/09/Logo_Branco_Site-300x88.png" alt=""/>
        </div>
      </header>
      <main>
        <div className="content">
          <CategorySelector />
        </div>
      </main>
    </>
  )
}

export default Loja;