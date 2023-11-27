// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://d078af8981db96caa208e21ac954bb6f@o4506278335348736.ingest.sentry.io/4506278620102656',
  // dsn: 'http://8c924abf994cc3fa68a926404ef68fe1@13.124.255.149:9000/2',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
