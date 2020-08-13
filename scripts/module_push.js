const { exec } = require('child_process');

const rootDir = process.env.INIT_CWD;
exec(`cd ${rootDir}; clasp push -f`, (err, stdout, _stderr) => {
  if (err) {
    console.log(err);
  }
  console.log(stdout);
});
