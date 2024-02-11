'use client'

import { usePathname } from 'next/navigation'
import Head from 'next/head';
import { useState, useEffect, type ReactElement } from 'react'

export default function NotFound(): ReactElement<any, any> | void {
  const code = (usePathname() as string)?.slice(1)
  const [redirectURL, setRedirectURL] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      const url = await fetchRedirectURL(code)
      setRedirectURL(url)
      setLoading(false)
    })()
  }, [code])

  useEffect(() => {
    (async () => {
      const { quantum } = await import('ldrs')
      quantum.register()
    })()
  }, [])

  if (isLoading) return LoadingScreen()
  if (redirectURL) return window.location.replace(redirectURL)
}

function LoadingScreen(): ReactElement<any, any> {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <Head>
        <title>Redirecting...</title>
      </Head>

      <l-quantum
        size="75"
        speed="1.75"
        color="var(--foreground-rgb)"
      ></l-quantum>
    </main>
  )
}

interface FetchRedirectURLResponse {
  url?: string
}

async function fetchRedirectURL(code: string): Promise<string | null> {
  const url = `/api/redirect?q=${code}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    return (await response.json() as FetchRedirectURLResponse).url ?? null
  } catch (e) {
    return null
  }
}
