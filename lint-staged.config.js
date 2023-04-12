// lint-staged.config.js
module.exports = {
  '!(src/__generated__/*.graphql.ts|src/assets/*.png)*.ts?(x)': files => {
    return [`prettier -w ${files}`];
  },
};
