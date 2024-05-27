"use client"

import React, { Dispatch, useState, useEffect } from "react"
import { Button, Icons } from "components/ui"

const Modal = ({
  data,
  setDisplayModal,
}: {
  data: any
  setDisplayModal: Dispatch<React.SetStateAction<boolean>>
}) => {
  const [link, setLink] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)

    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleDisplayModal = () => {
    setDisplayModal(false)
  }

  useEffect(() => {
    if (data) {
      setLink(data.paymentLinkUrl)
    }
  }, [data])

  return (
    <div className='pt-[5rem] fixed top-0 right-0 left-0 bottom-0 transition duration-500 ease-out flex flex-col items-center justify-center w-full mx-auto h-screen bg-white'>
      <div className='absolute flex flex-col justify-center items-center space-y-5 bg-white px-5 pt-5 pb-[5rem] rounded-lg'>
        <h1 className='uppercase text-2xl font-semibold text-center'>
          Payment Link Created
        </h1>
        <Icons.FaCheckCircle className='text-green-500' size={80} />
        <p className='text-2xl font-semibold text-gray-900 text-center'></p>
        <p className='text-gray-400'>please copy the link to share.</p>
        <div className='flex space-x-3'>
          <input
            className='bg-gray-100 w-full min-w-max'
            type='text'
            value={link}
            readOnly
            placeholder='Link'
          />
          <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
        </div>
        <Button
          onClick={handleDisplayModal}
          className='mt-10'
          type='reset'
          text='create another link'
        />
      </div>
    </div>
  )
}

export default Modal
