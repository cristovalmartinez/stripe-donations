"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { Icons, Modal } from "components/ui"
import { signUp } from "app/actions"
import { handleFormatPhoneNumber } from "lib/utils"

// Define interface for user data
interface UserData {
  fullName: string
  email: string
  phoneNumber: string
  status: string
}

const GenerateLinkForm = (): JSX.Element => {
  // State variables
  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserData>()

  // Function handles form submission
  const handleOnSubmit = async (data: UserData) => {
    setIsLoading(true)
    try {
      const result: any = await signUp(data)
      if (result?.error) {
        setErrorMessage(result.message)
      } else {
        setUserData(result)
        setDisplayModal(true)
        reset()
      }
    } catch (error: any) {
      console.error("Error occurred during sign up:", error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setErrorMessage(message ?? null) // Set errorMessage to null if message is null or undefined
  }, [message])

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Generate a payment link
        </h2>
        {errorMessage && (
          <p className='capitalize font-semibold text-center text-red-700'>
            {errorMessage.replaceAll("-", " ")}
          </p>
        )}
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-6'>
          <div className='sm:col-span-full'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium leading-6 text-gray-900'>
              Full Name*
            </label>
            <div className='mt-2'>
              <input
                type='text'
                className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                {...register("fullName", {
                  required: true,
                })}
              />
              {errors.fullName && (
                <span className='text-red-500 text-xs'>Provide full name</span>
              )}
            </div>
          </div>
          <div className='sm:col-span-full'>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'>
              Email*
            </label>
            <div className='mt-2'>
              <input
                type='email'
                className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <span className='text-red-500 text-xs'>provide an email</span>
              )}
            </div>
          </div>
          <div className='sm:col-span-full'>
            <label
              htmlFor='phoneNumber'
              className='block text-sm font-medium leading-6 text-gray-900'>
              Phone Number (optional)
            </label>
            <div className='mt-2'>
              <input
                type='tel'
                className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                {...register("phoneNumber")}
                onChange={(e) => {
                  setValue(
                    "phoneNumber",
                    handleFormatPhoneNumber(e.target.value)
                  )
                }}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='uppercase disabled:bg-opacity-40 h-16 disabled:shadow-sm shadow-lg hover:shadow-none transition ease duration-300 shadow-blue-400 bg-blue-900 py-5 rounded-full text-blue-100 w-2/3 md:w-1/3 flex items-center justify-center px-6 text-lg mx-auto font-medium'>
              {isLoading ? (
                <Icons.FaSpinner className='animate-spin' />
              ) : (
                "Get Link"
              )}
            </button>
          </div>
        </form>
      </div>
      {displayModal && (
        <Modal data={userData} setDisplayModal={setDisplayModal} />
      )}
    </div>
  )
}

export default GenerateLinkForm
