const Koa = require('koa');
const config = require('../config');
const RouterMiddleware = require('./routes');

const app = new Koa();
app.use(RouterMiddleware);

app.listen(config.port, () => {
  console.log(`Your server is alive at port ${config.port}.`);
});