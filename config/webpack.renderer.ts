import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import commonConfig from './webpack.common';
import productionConfig from './webpack.production';

const isDev = process.env.NODE_ENV === 'development';

interface DevelopmentConfig extends Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const rendererConfig: DevelopmentConfig = (function () {
  const baseConfig: Configuration = {
    target: ['web', 'electron-renderer'],
    entry: {
      app: path.resolve(__dirname, '../src/renderer/index.tsx'),
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      publicPath: isDev ? '/' : './',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        inject: true,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        },
      }),
    ],
  };

  baseConfig.mode = isDev ? 'development' : 'production';
  if (isDev) {
    baseConfig.plugins?.push(new webpack.HotModuleReplacementPlugin());
    baseConfig.plugins?.push(new ReactRefreshWebpackPlugin());
    baseConfig.devServer = {
      port: 3000,
      open: false,
      historyApiFallback: true,
    };
    return merge(commonConfig, baseConfig);
  }
  return merge(productionConfig, baseConfig);
})();

export default rendererConfig;
