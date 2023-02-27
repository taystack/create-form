module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: [
    '../src/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  reactOptions: {
    fastRefresh: true,
  },
};
