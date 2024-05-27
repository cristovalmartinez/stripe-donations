"use client"

import { Button } from "components/ui"
import { useEffect } from "react"

const Error = ({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='w-full h-screen flex flex-col space-y-10 items-center justify-center'>
      <h2 className='font-bold text-[3rem]'>Something went wrong</h2>
      <h3 className='uppercase'>error message: {error.message}</h3>
      <Button
        type='button'
        onClick={() => window.location.reload()}
        text='try again'
      />
    </div>
  )
}

export default Error
