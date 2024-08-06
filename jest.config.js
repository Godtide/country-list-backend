module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Correct environment for Node.js applications
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/src/test/**/*.(spec|test).ts?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
