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

  const { stderr } = await exec(`git checkout ${branches[index]}`);

  return stderr;
}

const deleteBranch = async (name, origin) => {
  const local = await exec(`git branch -D ${name}`);
  console.log(local.stdout);

  if (origin) {
    const remote = await exec(`git push ${origin} --delete ${name}`);
    console.log(remote.stderr);
  }
}

const deleteBranches = async ({ indexes = [], origin }) => {
  const branches = await getBranches();

  return Promise.all(indexes.map((index) => {
    if (!(index in branches)) {
      throw new Error(`Index #${index} of branches does not exist,\nrun git br first!`);
    }

    if (branches[index].includes('*')) {
      throw new Error(`Cannot delete branch \'${branches[index]}\' is checked out`);
    }

    return deleteBranch(branches[index], origin);
  }));
}

module.exports = {
  getBranches,
  performCheckout,
  deleteBranches,
}
