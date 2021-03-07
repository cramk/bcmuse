const Koa = require("koa");
const cors = require("@koa/cors");
const body = require("koa-json-body");
const app = new Koa();
const run_service__TRACK = require("./track_url_service");
const run_service__ALBUM = require("./album_url_service");
const determine_service_type = require("./service_classifier");
app.use(cors());
app.use(body({ limit: "10kb", fallback: true }));
app.use(async (ctx) => {
  console.log(ctx.request.body);
  /* determine track OR.. album.. or Disco */
  let service_resp = null;
  let service_type = await determine_service_type(ctx.request.body.url);
  console.log("Service type", service_type);
  switch (service_type) {
    case 0: //track
      console.log("service__TRACK", ctx.request.body.url);
      service_resp = await run_service__TRACK(ctx.request.body.url);
      break;
    case 1: //album
      console.log("service__ALBUM", ctx.request.body.url);
      service_resp = await run_service__ALBUM(ctx.request.body.url);
      break;
    case 2: //disco
      console.log("service__DISCO", ctx.request.body.url);
      break;
    default:
      console.log("No TYPE match");
    //nada
  }

  ctx.body = service_resp;
});

app.listen(9000);
console.log("listening on port 9000");
