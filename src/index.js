import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import '@blueprintjs/core/dist/blueprint.css';
import Routes from './routes';
import createStore from 'redux-zero';
import { Provider } from 'redux-zero/react';
import store from './store';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
