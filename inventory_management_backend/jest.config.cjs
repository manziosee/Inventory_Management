/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  testMatch: ['<rootDir>/src/tests/**/*.test.js'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: ['./src/tests/setupTests.js'],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"]
};

module.exports = config;
