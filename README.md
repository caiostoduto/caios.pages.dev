My Personal Website + URL Shortner using [Next.js](https://nextjs.org/), Cloudflare [Worker](https://workers.cloudflare.com/), [Pages](https://pages.cloudflare.com/) & [KVNamespace](https://developers.cloudflare.com/kv/learning/kv-namespaces/)

## Features

- [x] URL Shortner
- [x] Configurable Redirects *(using Cloudflare KVNamespace)*
- [x] Configurable Default Redirect
- [ ] *Homepage*

## Try it

- https://caios.pages.dev/ (Default Redirect to https://github.com/caiostoduto)
- https://caios.pages.dev/linkedin (Redirect to https://www.linkedin.com/in/caiostoduto/)

## Getting Started

1. Clone the repository
```bash
$ git clone git@github.com:caiostoduto/caios.pages.dev.git
```

2. Install dependencies
```bash
$ pnpm install
```

### Worker

3. Create a new Cloudflare KVNamespace

```bash
$ pnpx wrangler kv:namespace create REDIRECT
# Output:
...
Add the following to your configuration file in your kv_namespaces array:
{ binding = "REDIRECT", id = "eba0861323604a19a026ff38e0d65b8e" }
```

4. Copy the binding id and paste it replacing the '***' in the @app/worker/wrangler.toml file

```toml
kv_namespaces = [
  { binding = "REDIRECT", id = "eba0861323604a19a026ff38e0d65b8e" }
]
```

5. Deploy the worker

```bash
$ pnpx worker run deploy
```

6. Add your redirect routes to the KVNamespace *(suggest using [Cloudflare KVNamespace Dashboard](https://dash.cloudflare.com/))*

### Website

7. [Create a new Cloudflare Pages project](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#deploy-your-application-to-cloudflare-pages-1) *(suggest deploy using github/gitlab)*, and don't forget to set **nodejs_compat** compatibility flag.

![Image from Cloudflare Pages Dashboard setting compatibility flag](https://github.com/caiostoduto/caios.pages.dev/blob/main/docs/images/compatibility_flags.png)

8. [Add the following environment variables to the project](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard)

| Name | Example Value |
| --- | --- |
| NEXT_PUBLIC_REDIRECT_URL | https://caios.pages.dev |
| NEXT_PUBLIC_DEFAULT_REDIRECT_URL | https://github.com/caiostoduto |

*NEXT_PUBLIC_REDIRECT_URL is your Cloudflare Worker URL from step 6*\
*NEXT_PUBLIC_DEFAULT_REDIRECT_URL is the default route to redirect in case the url query wans't found in the KVNamespace*

![Image from Cloudflare Pages Dashboard setting environment variables](https://github.com/caiostoduto/caios.pages.dev/blob/main/docs/images/env_vars.png)

9. [Retry your latest deploy](https://dash.cloudflare.com/)

![Image from Cloudflare Pages Dashboard retrying latest deploy](https://github.com/caiostoduto/caios.pages.dev/blob/main/docs/images/retry_deploy.png)
