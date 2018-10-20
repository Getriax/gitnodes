const { performCheckout } = require('./branches.service');

const getBranchIndex = () => {
  return process.argv[2] - 1;
}

performCheckout(getBranchIndex())
  .then(console.log)
  .catch(e => console.error(e.message));
