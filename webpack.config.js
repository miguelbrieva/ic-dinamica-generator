// [OK] Crear los archivos en base a la data
// [OK] Falta pasar el template poblado. Esto puede ser mediante una función
// [OK] generar los HtmlPlugins
// [OK] linkear las imágenes. Obs:
// [] automatizar css de botones
// [] definir donde se inserta el link de css

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const fs = require('fs');

const data = require('./src/data/data.js');
const normalizeUrl = require('./src/js/utils/nomalizeUrl');
const createTemplate = require('./src/js/createTemplate');

function deleteFiles() {
  const files = fs.readdirSync(path.join(__dirname, 'src', 'templates'));
  for (let file of files) {
    fs.unlinkSync(path.join(__dirname, 'src', 'templates', file));
  }
}

function createHtmlTemplates(data) {
  // Delete /templates directory
  deleteFiles();
  // Create html templates
  return data.forEach((el, i, arr) => {
    let cat = normalizeUrl(el.category);
    fs.writeFileSync(`./src/templates/${cat}.html`, createTemplate(el, arr));
  });
}

function generateHtmlPlugins(templateDir) {
  const files = fs.readdirSync(path.resolve(__dirname, templateDir));

  return files.map(item => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

createHtmlTemplates(data);
const htmlPlugins = generateHtmlPlugins(
  path.resolve(__dirname, 'src', 'templates')
);

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'IC Dinámico',
    //   filename: 'uno.html',
    //   template: './src/templates/uno.html',
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/ripley.css',
    }),
  ].concat(htmlPlugins),
};
