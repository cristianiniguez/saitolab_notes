import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import New from './pages/New';
import Update from './pages/Update';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/sign-up' component={SignUp} />
          <Route exact path='/new' component={New} />
          <Route exact path='/update/:id' component={Update} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
