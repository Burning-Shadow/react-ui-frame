import baseConfig from './rollup.config';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace'; // 环境变量设置
// import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';

const config = {
  ...baseConfig,
  output: {
    name: 'Vikingship',
    file: 'dist/index.umd.js',
    format: 'umd',
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'axios': 'Axios',
    },
    plugins: [terser()],
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ...baseConfig.plugins
  ],
  /**
   * 打包过程中忽略的部分代码。
   * 此处之所以并未使用 'rollup-plugin-exclude-dependencies-from-bundle'，是希望减少用户手动引入依赖包的 cdn
   * 除此之外还需为排除掉的依赖确定一个全局变量，在上方 output 的 globals 中定义
   */
  external: ['react', 'react-dom', 'axios'],
};

export default config;