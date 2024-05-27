"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, Transition } from "@headlessui/react"
import { Icons } from "components/ui"
import { addNewProduct } from "app/actions"
import { Button } from "components/ui"

const AddProduct = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)
  const [productId, setProductId] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Function handles form submission
  const handleOnSubmit = async (productData: any) => {
    setIsLoading(true)
    try {
      const product = await addNewProduct(productData)
      if (!product.error) {
        reset()
        // @ts-ignore
        setProductId(product?.productId)
        setIsProductCreated(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  return (
    <>
      <Button
        className='bg-transparent shadow-none text-gray-900 border-4'
        text='New Product'
        type='button'
        onClick={() => setIsModalOpen(true)}
      />
      <Transition.Root show={isModalOpen} as={React.Fragment}>
        <Dialog onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <div className='fixed z-10 inset-1 overflow-y-auto'>
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className='flex justify-center items-center min-h-screen'>
                <div className='bg-white p-10 md:p-16 rounded w-full max-w-2xl relative'>
                  <button
                    className='absolute right-10 top-5 font-extrabold text-xl'
                    onClick={() => {
                      setIsProductCreated(false)
                      setIsModalOpen(false)
                    }}>
                    X
                  </button>
                  {isProductCreated ? (
                    `${productId} has been created`
                  ) : (
                    <>
                      <div>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium leading-6 mb-2 text-gray-900'>
                          Name
                        </label>

                        <input
                          type='text'
                          id='name'
                          className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                          {...register("name", {
                            required: true,
                          })}
                        />
                        {errors.name && (
                          <span className='text-red-500 text-xs'>
                            Add product name
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor='description'
                          className='block text-sm font-medium leading-6 mb-2 text-gray-900'>
                          Description
                        </label>

                        <textarea
                          id='description'
                          className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                          {...register("description", {
                            required: true,
                          })}
                        />
                        {errors.description && (
                          <span className='text-red-500 text-xs'>
                            Add product description
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor='imageUrl'
                          className='block text-sm font-medium leading-6 mb-2 text-gray-900'>
                          Image URL
                        </label>
                        <input
                          type='url'
                          id='imageUrl'
                          className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                          {...register("imageUrl", {
                            required: true,
                          })}
                        />
                        {errors.imageUrl && (
                          <span className='text-red-500 text-xs'>
                            Add product image url
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor='url'
                          className='block text-sm font-medium leading-6 mb-2 text-gray-900'>
                          URL
                        </label>

                        <input
                          type='url'
                          id='url'
                          className='block placeholder:text-gray-300 w-full px-5 font-medium text-lg text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none py-4'
                          {...register("url", {
                            required: true,
                          })}
                        />
                        {errors.url && (
                          <span className='text-red-500 text-xs'>
                            Add product URL
                          </span>
                        )}
                      </div>
                      <div className='mt-4'>
                        <button
                          type='submit'
                          disabled={isLoading}
                          className='disabled:bg-opacity-40 h-16 disabled:shadow-sm lowercase shadow-lg hover:shadow-none transition ease duration-300 shadow-blue-400 bg-blue-900 py-5 rounded-full text-blue-100 w-2/3 md:w-full flex items-center justify-center px-6 text-lg mx-auto font-medium'>
                          {isLoading ? (
                            <Icons.FaSpinner className='animate-spin' />
                          ) : (
                            "add product"
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default AddProduct
