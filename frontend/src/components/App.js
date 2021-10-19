
import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ItemDetails from './item-details'
import ListContainer from './container'


function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <Switch>
          <Route exact path="/">
            <ListContainer />
          </Route>
          <Route path="/:ref">
            <ItemDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
