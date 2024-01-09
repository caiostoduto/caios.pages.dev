import { Router } from '@tsndr/cloudflare-worker-router'

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  REDIRECT: KVNamespace

  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
}

const DEFAULT_REDIRECT = 'DEFAULT'

// Initialize Router
const router = new Router<Env>()

// Enabling build in CORS support
router.cors()

router.get('/redirect', async ({ req, env }) => {
  const url = new URL(req.url)
  let query = url.searchParams.get('q')?.toLowerCase()

  if (query === undefined || query === '') {
    query = DEFAULT_REDIRECT // return new Response('Missing query', { status: 400 })
  }

  return await returnKVResponse(env, query)
})

async function returnKVResponse (env: Env, query: string): Promise<Response> {
  const value = await env.REDIRECT.get(query)

  if (value !== null) {
    return new Response(
      JSON.stringify({
        url: value,
        default: query === DEFAULT_REDIRECT
      }), { status: 200 })
  } else {
    if (query !== DEFAULT_REDIRECT) {
      return await returnKVResponse(env, DEFAULT_REDIRECT)
    } else {
      return new Response('Not found', { status: 404 })
    }
  }
}

// Listen Cloudflare Workers Fetch Event
export default {
  async fetch (request: Request, env: Env, ctx: ExecutionContext) {
    return await router.handle(request, env, ctx)
  }
}
