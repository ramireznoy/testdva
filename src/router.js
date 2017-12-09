import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import CountersView from './routes/CountersView';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CountersView} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
