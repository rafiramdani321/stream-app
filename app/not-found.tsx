import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col space-y-4 items-center justify-center text-muted-foreground bg-background">
      <h1 className='text-4xl text-bluePrimary'>404</h1>
      <p>
        We couldn&apos;t find the page you were looking for.
      </p>
      <Button variant="secondary" asChild>
        <Link href="/">
          Go back home
        </Link>
      </Button>
    </div>
  )
}

export default NotFoundPage