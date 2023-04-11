import type { Configuration } from 'webpack';

import path from 'path';
import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  entry: path.join(__dirname, '../src/main/index.ts'),
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
