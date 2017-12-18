const actions = store => ({
  setSearchText: (state, text) => ({ search: text }),
  setUser: (state, user) => ({ user: user })
});

export default actions;
