const fs = require('fs');
const gitDiff = require('git-diff');

const gitDiffConfig = {
  flags: '--diff-algorithm=minimal --ignore-all-space',
};

function createDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function getVersions(path) {
  createDir(path);
  return fs.readdirSync(path);
}

function compareCurrentFiles(body, path = './versions') {
  const versions = getVersions(path);
  let matchFound = false;


  versions.forEach((f) => {
    const data = fs.readFileSync(`${path}/${f}`, 'utf8');

    if (data && typeof data === 'string') {
      const diff = gitDiff(body, data, gitDiffConfig);
      matchFound = !diff;
    }
  });

  if (!matchFound) {
    fs.writeFileSync(`${path}/${Date.now()}.js`, body);
  }

  return matchFound;
}

const utils = {
  createDir,
  getVersions,
  compareCurrentFiles,
};

module.exports = utils;
