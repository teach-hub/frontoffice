// lint-staged.config.js
module.exports = {
  "!(src/__generated__/*.graphql.ts)*.ts?(x)": (staged) => ["tsc --noEmit --pretty", `prettier -w ${staged.join(' ')}`]
};
