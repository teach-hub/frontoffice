// lint-staged.config.js
module.exports = {
  '!(src/__generated__/*.graphql.ts|src/assets/*.png)*.ts?(x)': (files) => {
    const fileNames = files.join(' ');

    return [`eslint ${fileNames}`, `prettier -w ${fileNames}`];
  }
};
