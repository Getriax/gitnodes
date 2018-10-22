const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const getBranches = async () => {
  const { stdout: branches } = await exec('git branch');

  const branchesArray = branches.split('\n');

  return branchesArray.filter(branch => branch)
    .map(branch => branch.trim());
};

const performCheckout = async (index) => {
  const branches = await getBranches();

  if (!(index in branches)) {
    throw new Error(`Index #${index} of branches does not exist,\nrun git br first!`);
  }

  if (branches[index].includes('*')) {
    throw new Error(`Already on \'${branches[index]}\'`);
  }

  exec(`git checkout ${branches[index]}`);
  return `Switched to branch \'${branches[index]}\'`
}

module.exports = {
  getBranches,
  performCheckout,
}
