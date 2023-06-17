import WebpackBar from 'webpackbar';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';

const isDev = process.env.NODE_ENV === 'development';
const commonConfig: webpack.Configuration = {
  devtool: isDev ? 'source-map' : false,
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.less$/,
        include: /src/,
        exclude: /node_modules/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
        type: 'json',
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'images/[name]_[contenthash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[contenthash].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        generator: {
          filename: 'media/[name]_[contenthash].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.js', '.less', '.css', '.json'],
  },
  plugins: [
    new WebpackBar({
      color: '#85d',
    }),
  ],
  cache: {
    type: 'filesystem',
  },
};

export default commonConfig;
