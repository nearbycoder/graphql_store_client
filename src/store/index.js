import createStore from 'redux-zero';

const initialState = {
  search: '',
  user: null
};
const store = createStore(initialState);

export default store;
