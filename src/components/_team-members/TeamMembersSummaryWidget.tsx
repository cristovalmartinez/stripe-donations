"use client"

import type Stripe from "stripe"
import React, { useEffect, useState } from "react"
import { Dialog, Transition } from "components/ui/Headlessui"
import { deactivatePaymentLink } from "app/actions"
import { Icons } from "components/ui"

interface UserData {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  paymentLinkUrl: string
  paymentLinkId: string
  status: string
  totalDonations: string
  donationAverage: string
}

const TeamMemberSummaryWidget = ({
  data,
  paymentIntents,
}: {
  data: UserData[]
  paymentIntents: Stripe.PaymentIntent[]
}): JSX.Element => {
  const [userData, setUserData] = useState<UserData[]>([])
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    const calculateDonations = () => {
      const userDataCopy = [...data]

      userDataCopy.forEach((user) => {
        const userPaymentIntents = paymentIntents.filter(
          (intent) =>
            intent.metadata?.email === user.email &&
            intent.metadata?.organization === "ABC"
        )

        const totalDonations = (
          userPaymentIntents.reduce(
            (total: number, intent: any) => total + intent.amount,
            0
          ) / 100
        ).toFixed(2)

        const donationAverage =
          userPaymentIntents.length > 0
            ? // @ts-ignore
              totalDonations / userPaymentIntents.length
            : 0

        user.totalDonations = totalDonations
        user.donationAverage = donationAverage.toFixed(2)
      })

      setUserData(userDataCopy)
    }

    try {
      calculateDonations()
    } catch (error) {
      console.error("Error calculating donations:", error)
      // Handle error state here
    } finally {
      setIsLoading(false)
    }
  }, [data, paymentIntents])

  const handleDeactivate = async (
    userId: number,
    userPaymentLinkId: string
  ) => {
    await deactivatePaymentLink(userId, userPaymentLinkId)
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.id === userId ? { ...user, status: "inactive" } : user
      )
    )
    setIsModalOpen(false)
  }

  return (
    <>
      {isLoading ? (
        <Icons.FaSpinner className='animate-spin' size={25} />
      ) : userData.length === 0 ? (
        <p className='text-gray-400 text-center my-10'>
          {`There isn't enough data to display`}
        </p>
      ) : (
        <div className='rounded-2xl'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-5'>
                    name
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    email
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    phone number
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    payment link url
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    total donations
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    donation average
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    status
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-10'>
                      <th
                        scope='row'
                        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase'>
                        {user.fullName}
                      </th>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {user.email}
                      </td>
                      <td className='px-6 py-2 whitespace-nowrap'>
                        {user.phoneNumber}
                      </td>
                      <td className='px-6 py-2'>{user.paymentLinkUrl}</td>
                      <td className='px-6 py-2'>${user.totalDonations}</td>
                      <td className='px-6 py-2'>${user.donationAverage}</td>
                      <td className='px-6 py-2'>{user.status}</td>
                      <td className='px-6 py-2 text-red-600'>
                        <button
                          disabled={user.status === "inactive"}
                          className='disabled:opacity-30'
                          onClick={() => {
                            setSelectedUser(user)
                            setIsModalOpen(true)
                          }}>
                          {user.status === "inactive"
                            ? "inactive"
                            : "deactivate"}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Transition.Root show={isModalOpen} as={React.Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={setIsModalOpen}>
          <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'>
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'>
                        Deactivate User
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Are you sure you want to deactivate link{" "}
                          {selectedUser?.paymentLinkUrl}?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    disabled={selectedUser?.status === "inactive"}
                    type='button'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => {
                      handleDeactivate(
                        // @ts-ignore
                        selectedUser?.id,
                        selectedUser?.paymentLinkId
                      )
                    }}>
                    Deactivate
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default TeamMemberSummaryWidget
