module.exports = {
  root: true,
  extends: ["@pipelines/eslint-config/react.js"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
