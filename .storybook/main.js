const path = require('path');

// utils
const paths = require('../config/paths');

module.exports = {
  webpackFinal: async (config) => {
    const newModuleRules = config.module.rules.filter((item) => String(item.test) !== String(/\.s[ca]ss$/));

    return {
      ...config,
      module: {
        rules: [
          ...newModuleRules,
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
          },
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          '@pages': `${paths.appSrc}/pages`,
          '@icons': `${paths.appSrc}/assets/icons`,
          '@images': `${paths.appSrc}/assets/images`,
          '@utils': `${paths.appSrc}/utils`,
          '@components': `${paths.appSrc}/components`,
          '@containers': `${paths.appSrc}/containers`,
          '@styles': `${paths.appSrc}/styles`,
          '@hooks': `${paths.appSrc}/hooks`,
          '@schema': `${paths.appSrc}/schema`,
          '@service': `${paths.appSrc}/service`,
          '@store': `${paths.appSrc}/store`,
        },
      },
    };
  },
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
