import createStore from 'redux-zero';

const initialState = { search: '' };
const store = createStore(initialState);

export default store;
