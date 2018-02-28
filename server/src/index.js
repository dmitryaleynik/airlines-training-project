const Koa = require('koa');
const RouterMiddleware = require('./routes');

const app = new Koa();

app.use(RouterMiddleware);

app.listen(3001, () => {
  console.log('Your server is alive.');
});