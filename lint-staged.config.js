// lint-staged.config.js
module.exports = {
  "!(**/**/__generated__/**)*.ts": [],
  "**/*.ts?(x)": (staged) => ["tsc --noEmit --pretty", `prettier -w ${staged.join(' ')}`],
};
