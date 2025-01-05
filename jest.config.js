module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,  // Collect code coverage
    coverageDirectory: 'coverage',  // Directory to store coverage reports
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],  // Ignore files in node_modules and dist directories
  };
  