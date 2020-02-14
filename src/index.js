import './css/index.scss';
const data = require('./data/data');

data.forEach(item => {
  require(`./images/${item.banners.desktop}`);
  require(`./images/${item.banners.mobile}`);
});
