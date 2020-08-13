module.exports = () => {
  const rootDir = process.env.INIT_CWD;
  return {
    globals: {
      'ts-jest': {
        diagnostics: false,
      },
      SpreadsheetApp: {},
    },
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'json', 'd.ts', 'ts', 'tsx'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    rootDir,
    moduleNameMapper: {
      [`^@/(.*)$`]: '<rootDir>/src/$1',
      '^utils/(.*)$': '<rootDir>/../utils/src/$1',
    },
  };
};
