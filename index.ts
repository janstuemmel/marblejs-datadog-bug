import './dd-trace';

import { createServer, httpListener, HttpMiddlewareEffect, r } from "@marblejs/http";
import { bodyParser$ } from "@marblejs/middleware-body";
import { map, tap } from "rxjs";
import pino from 'pino';

const middlewares: HttpMiddlewareEffect[] = [
  bodyParser$(),
];

const testEffect$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect((req$) => {
    return req$.pipe(
      tap((req) => pino().info(req.body)),
      map((req) => ({ body: req.body })),
    );
  }),
);

const listener = httpListener({
  middlewares,
  effects: [ 
    testEffect$,
  ]
});

async function main() {
  const listen = await createServer({
    port: 3000,
    hostname: '0.0.0.0',
    listener,
  });  
  await listen();
}

main().catch(console.error);