import React, { useState } from 'react';

import './styles.css';

function CategorySelector(){
    const [category, setCategory] = useState('');

    return (
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
    )
}

export default CategorySelector;