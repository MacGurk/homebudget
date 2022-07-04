const coverageReporters = () => {
  if ('XML_COVERAGE' in process.env) {
    return ['text', 'cobertura'];
  } else {
    return ['text'];
  }
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'json', 'js'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!src/server.ts',
    '!src/app.ts',
    '!jest.config.js',
  ],
  coverageReporters: coverageReporters(),
};
