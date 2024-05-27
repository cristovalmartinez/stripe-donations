"use client"

import { Icons } from "components/ui"
import { useState, useEffect } from "react"
import { signIn } from "app/actions"
import { useForm } from "react-hook-form"
import { useSearchParams, useRouter } from "next/navigation"

const SigninForm = (): JSX.Element => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const message = searchParams.get("message")
  const [errorMessage, setErrorMessage] = useState<string | null>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [Message, setMessage] = useState<string | null>("")
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })

  /*
   * Function handles on change for input fields
   *
   */
  const handleOnSubmit = async (data: any) => {
    setIsLoading(true)
    const result = await signIn(data)
    // @ts-ignore
    if (result?.error) {
      // @ts-ignore
      setErrorMessage(result.message)
      setIsLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  useEffect(() => {
    setErrorMessage(message)
  }, [errorMessage])

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <span className='w-1/3 mx-auto block h-3 rotate-[14deg] bg-blue-900'></span>
          <span className='w-1/3 mx-auto block h-3 rotate-[14deg] bg-blue-500 mt-1'></span>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
          {Message !== "" || Message !== null ? (
            <p className='capitalize font-semibold text-center text-red-700'>
              {Message?.replaceAll("-", " ")}
            </p>
          ) : (
            ""
          )}
          {errorMessage !== "" || errorMessage !== null ? (
            <p className='capitalize font-semibold text-center text-red-700'>
              {errorMessage?.replaceAll("-", " ")}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-6'>
            <div className='sm:col-span-full'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Password
              </label>
              <div className='mt-2'>
                <input
                  type='password'
                  className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                  {...register("password", {
                    required: "enter your password.",
                  })}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='disabled:bg-opacity-40 h-16 disabled:shadow-sm lowercase shadow-lg hover:shadow-none transition ease duration-300 shadow-blue-400 bg-blue-900 py-5 rounded-full text-blue-100 w-2/3 md:w-1/3 flex items-center justify-center px-6 text-lg mx-auto font-medium'>
                {isLoading ? (
                  <Icons.FaSpinner className='animate-spin' />
                ) : (
                  "signin"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SigninForm
