const { getBranches } = require('./branches.service');

const applyIndexesAndPrint = (branches) => {
  const indexedBranches = branches.map((branch, index) => branch.includes('*')
  ?`[*] ${branch.split('*')[1].trim()}`
  : `[${index + 1}] ${branch}`);

  indexedBranches.forEach(branch => branch.includes('*')
    ? console.log("\x1b[32m", branch, "\x1b[37m")
    : console.log("\x1b[37m", branch));
}

getBranches()
  .then(applyIndexesAndPrint)
  .catch(e => console.error(e.message));
