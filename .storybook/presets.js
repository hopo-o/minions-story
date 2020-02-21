const path = require('path');

module.exports = [
  // ts 支持
  {
    name: '@storybook/preset-typescript',
    options: {
      tsLoaderOptions: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      },
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      },
      forkTsCheckerWebpackPluginOptions: {
        colors: false, // disables built-in colors in logger messages
      },
      include: [path.resolve(__dirname, '../src')],
    },
  },

  // Storybook Docs
  {
    name: '@storybook/addon-docs',
    options: {
      configureJSX: true,
      babelOptions: {},
      sourceLoaderOptions: null,
    },
  },

  // antd 支持
  // {
  //   name: '@storybook/preset-ant-design',
  //   options: {
  //     lessOptions: {
  //       modifyVars: {
  //         'border-radius-base': '2px',
  //       },
  //     },
  //   },
  // },
]