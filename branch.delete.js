const { deleteBranches } = require('./git.service');

const getDeleteArguments = () => {
  const origin = process.argv.find(
    (arg, index, self) => index === 0
      ? false
      : self[index - 1] === '-remote',
  );

  const indexes = process.argv
    .filter(arg => !isNaN(arg))
    .map(index => parseInt(index) - 1);

  return { origin, indexes };
}

deleteBranches(getDeleteArguments())
  .catch(error => console.error(error.message));
