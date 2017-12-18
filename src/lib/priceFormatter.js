export default price => {
  return `$${(price / 100).toFixed(2)}`;
};
