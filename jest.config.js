module.exports = {
    clearMocks: true,
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    setupFilesAfterEnv: ['./app/jest-setup.js'],
    setupFiles: [
        '<rootDir>/__mocks__/dom-setup.js'
    ],
    verbose: true,
};
