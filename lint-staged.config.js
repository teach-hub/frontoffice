// lint-staged.config.js
module.exports = {
  "!(src/__generated__/*.graphql.ts)*.ts?(x)": files => {
    return [`prettier -w ${files}`]
  },
};
