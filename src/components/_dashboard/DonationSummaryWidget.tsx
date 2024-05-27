"use client"

import "react-datepicker/dist/react-datepicker.css"
import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { handleDateFormat } from "lib/utils"

/**
 * Donations summary table
 *
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
const DonationSummaryWidget = ({ data }: { data: any }): JSX.Element => {
  const storedStartDate =
    typeof window !== "undefined" && window.localStorage.getItem("startDate")
  const storedEndDate =
    typeof window !== "undefined" && window.localStorage.getItem("endDate")

  const [startDate, setStartDate] = useState<Date | null>(
    storedStartDate ? new Date(storedStartDate) : null
  )
  const [endDate, setEndDate] = useState<Date | null>(
    storedEndDate ? new Date(storedEndDate) : new Date()
  )

  useEffect(() => {
    if (startDate && typeof window !== "undefined") {
      window.localStorage.setItem("startDate", startDate.toISOString())
    } else {
      window.localStorage.removeItem("startDate")
    }
  }, [startDate])

  useEffect(() => {
    if (endDate && typeof window !== "undefined") {
      window.localStorage.setItem("endDate", endDate.toISOString())
    } else {
      window.localStorage.removeItem("endDate")
    }
  }, [endDate])

  const filteredData = data.filter((intent: any) => {
    const intentDate = new Date(intent.created * 1000) // Convert UNIX timestamp to milliseconds
    return (
      (!startDate || intentDate >= startDate) &&
      (!endDate || intentDate <= endDate)
    )
  })

  return (
    <>
      <div className='flex md:flex-row flex-col justify-start space-y-4 md:space-y-0 md:space-x-4 my-10'>
        <div>
          <label className='block' htmlFor='startDate'>
            Start Date
          </label>
          <DatePicker
            className='border'
            selected={startDate}
            onChange={(date: Date) => setStartDate(date as Date)}
            dateFormat='MM-dd-yyyy'
          />
        </div>
        <div>
          <label className='block' htmlFor='endDate'>
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date as Date)}
            dateFormat='MM-dd-yyyy'
          />
        </div>
      </div>
      {filteredData.length === 0 ? (
        <p className='text-gray-400 text-center my-10'>
          There isn&#39;t enough data to display
        </p>
      ) : (
        <div className='rounded-2xl'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-5'>
                    id
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    date
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    status
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    amount
                  </th>
                  <th scope='col' className='px-6 py-5'>
                    team member
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((intent: any) => {
                  return (
                    <tr
                      key={intent.id}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <th
                        scope='row'
                        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase'>
                        {intent.id}
                      </th>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {handleDateFormat(intent.created)}
                      </td>
                      <td className='px-6 py-2'> {intent.status}</td>
                      <td className='px-6 py-2'>
                        ${(intent.amount / 100).toFixed(2)}
                      </td>
                      <td className='px-6 py-2 whitespace-nowrap'>
                        {intent?.metadata?.name
                          ? intent?.metadata?.name
                          : "N/A"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default DonationSummaryWidget
