import path from 'path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import productionConfig from './webpack.production';

const isDev = process.env.NODE_ENV === 'development';

const mainConfig: Configuration = merge(isDev ? commonConfig : productionConfig, {
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, '../src/main/index.ts'),
    preload: path.resolve(__dirname, '../src/main/preload.ts'),
  },
});

export default mainConfig;
