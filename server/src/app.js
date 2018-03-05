require('dotenv').config();
const Koa = require('koa');
const RouterMiddleware = require('./Routes');

const app = new Koa();
app.use(RouterMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Your server is alive on port ${process.env.PORT}.`);
});
