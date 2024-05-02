module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react.js"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
