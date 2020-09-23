import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Loja from './pages/Loja';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Loja} />
        </BrowserRouter>
    )
}

export default Routes;