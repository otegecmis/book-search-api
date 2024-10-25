export default {
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  setupFiles: ["<rootDir>/config/mock.config.js"],
};
