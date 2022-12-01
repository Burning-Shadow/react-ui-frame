import baseConfig from './rollup.config';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

const config = {
  ...baseConfig,
  output: {
    file: 'dist/index.es.js',
    format: 'es',
  },
  plugins: [
    ...baseConfig.plugins,
    excludeDependenciesFromBundle(),
  ],
  // 打包过程中忽略的部分代码。但可通过插件 rollup-plugin-exclude-dependencies-from-bundle 自动分析，移除不必要的 peerDependencies 和 dependencies
  // external: ['react', 'react-dom', 'axios'],
};

export default config;
