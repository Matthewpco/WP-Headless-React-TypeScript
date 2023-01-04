module.exports = {
  // See https://github.com/kulshekhar/ts-jest/issues/1346#issuecomment-891934810
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i':
      '<rootDir>/__mocks__/imageMock.js',

    '\\.svg': '<rootDir>/__mocks__/svgMock.js',

    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '__data__',
    '__setup__',
  ],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],

  /**
   * Testing coverage settings and overrides.
   */
  coverageThreshold: {
    // We should aim to lock these in as close to 100 as possible.
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    /**
     * When we get to optimum coverage for a particular component or set
     * of functions, we can set the expected coverage scores high to prevent
     * regression.
     */
    // './components/Icon': {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 0,
    // },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/out/**',
    '!**/.next/**',
    '!sentry.*.config.ts',
    '!server.js',
    '!.eslintrc.js',
    '!.lintstagedrc.js',
    '!jest.config.js',
    '!next.config.js',
    '!**/pages/**',
    '**/components/pages/**',
    '!**/data/sample/**',
    '!**/types/**',
    '!**/coverage/lcov-report/**',
    '!**/__tests__/**',
    '!docs/**',
  ],
};

export {};
