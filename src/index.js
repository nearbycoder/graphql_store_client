import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import '@blueprintjs/core/dist/blueprint.css';
import Routes from './routes';
import { Provider } from 'redux-zero/react';
import store from './store';

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = setContext((_, { headers }) => {
  let authHeaders = {};
  try {
    if (localStorage.getItem('auth_headers') !== null) {
      authHeaders = JSON.parse(localStorage.getItem('auth_headers'));
    }
  } catch (e) {
    authHeaders = {};
  }

  return {
    headers: {
      ...headers,
      ...authHeaders
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
