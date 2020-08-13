const GasPlugin = require('gas-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');   

const path = require('path');

module.exports = () => {
  const moduleDirPath = process.env.INIT_CWD;
  const webpackRoot = process.env.PWD;

  return {
    mode: 'production',
    devtool: false,
    context: moduleDirPath,
    entry: {
      main: path.resolve(moduleDirPath, 'src', 'index.ts'),
    },
    output: {
      path: path.resolve(moduleDirPath, 'dist'),
      filename: 'index.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        '@': path.resolve(moduleDirPath, 'src'),
        'utils': path.resolve(webpackRoot, 'apps', 'utils', 'src')
      },
    },
    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          loader: 'babel-loader'
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(moduleDirPath, 'tsconfig.json'),
          },
        },
      ]
    },
    plugins: [new GasPlugin(), new Es3ifyPlugin()],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    }
  }
};