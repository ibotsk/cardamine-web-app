import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CNavbar from '../segments/Navbar';
import Home from './Home';
import Checklist from './checklist/Checklist';
import Chromosomes from './chromosomes/Chromosomes';
import NameDetail from './checklist/NameDetail';

import config from '../../config';

import '../../styles/custom.css';

const Routing = () => (
  <Switch>
    <Route exact path={config.routes.home} component={Home} />
    <Route exact path={config.routes.checklist} component={Checklist} />
    <Route exact path={config.routes.chromosomes} component={Chromosomes} />
    <Route exact path={config.routes.nameDetail} component={NameDetail} />
  </Switch>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <CNavbar />
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
