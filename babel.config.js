module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: "11"
        },
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-transform-runtime'
  ]
};