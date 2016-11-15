///<reference path="../../typings/index.d.ts"/>
///<reference path="../../d.ts/index.d.ts"/>
import * as koa from 'koa';
import * as path from 'path';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as views from 'koa-views';
import * as co from 'co';

const app = new koa();

app.use(bodyParser())
app.use(async (ctx, next) => {
  const start:any = new Date();
  await next();
  const ms:any = new Date();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.listen('4200', function () {
   console.log('Start app listening at http://localhost:%s, environment:%s', 4200, 'development');
})






