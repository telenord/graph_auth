import React from 'react';
import ReactDOM from 'react-dom';
import AppoloClient, { createNetworkInterface } from 'apollo-client';
import { browserHistory, Router, Route, hashHistory} from 'react-router';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new AppoloClient({
  networkInterface,
  dataIdFromObject: o => o.id

});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/dashboard' component={Signup}/>
        </Route>

      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root/>, document.querySelector('#root'));

