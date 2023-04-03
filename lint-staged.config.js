// lint-staged.config.js
module.exports = {
  "!(src/__generated__/*.graphql.ts)*.ts?(x)": staged => [`prettier -w ${staged.join(' ')}`]
};
