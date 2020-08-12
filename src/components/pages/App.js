import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CNavbar from '../segments/Navbar';
import Home from './Home';
import Checklist from './checklist/Checklist';
import NameDetail from './checklist/NameDetail';
import Chromosomes from './chromosomes/Chromosomes';
import ChromRecordDetail from './chromosomes/ChromRecordDetail';

import config from '../../config';

import '../../styles/custom.css';

const Routing = () => (
  <Switch>
    <Route exact path={config.routes.home} component={Home} />
    <Route exact path={config.routes.checklist} component={Checklist} />
    <Route exact path={config.routes.nameDetail} component={NameDetail} />
    <Route exact path={config.routes.chromosomes} component={Chromosomes} />
    <Route
      exact
      path={config.routes.chromosomesDetail}
      component={ChromRecordDetail}
    />
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
