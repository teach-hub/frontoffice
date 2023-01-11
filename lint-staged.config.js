// lint-staged.config.js
module.exports = {
  "!(src/__generated__/*.graphql.ts)*.ts?(x)": (staged) => {
    const files = staged.join(' ');
    console.log("linting files", files)
    return [`prettier -w ${files}`]
  }
};
