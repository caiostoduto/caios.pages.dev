'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect, type ReactElement } from 'react'

export default function NotFound (): ReactElement<any, any> | void {
  const code = (usePathname() as string)?.slice(1)
  const [data, setData] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchRedirectURL(code).then((url) => {
      setData(url)
      setLoading(false)
    })
  }, [code])

  if (isLoading) return LoadingScreen()
  if (data === null) return redirectDefault()

  return window.location.replace(data)
}

function LoadingScreen (): ReactElement<any, any> {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p className="text-2xl font-bold text-gray-800">Loading...</p>
    </div>
  )
}

function redirectDefault (): void {
  window.location.replace(
    process.env['NEXT_PUBLIC_DEFAULT_REDIRECT_URL'] as string)
}

interface FetchRedirectURLResponse {
  url?: string
}

async function fetchRedirectURL(code: string): Promise<string | null> {
  const url = `${process.env['NEXT_PUBLIC_REDIRECT_URL']}/redirect?q=${code}`

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
