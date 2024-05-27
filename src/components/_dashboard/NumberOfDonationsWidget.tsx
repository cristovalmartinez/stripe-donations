"use client"

const NumberOFDonationsWidget = ({ data }: { data: any }): JSX.Element => {
  const filteredData = data.filter(
    (paymentIntent: any) => paymentIntent.status === "succeeded"
  )
  const numberOfDonations = filteredData.length

  return (
    <div className='rounded-xl border bg-white py-4 px-10 w-full'>
      <div className='flex gap-y-10 items-end justify-between w-full'>
        <div className='w-full'>
          <span className='border-b text-sm flex py-2 items-center justify-center font-normal text-gray-400 uppercase'>
            Number of Donations
          </span>
          <div className='h-[4rem] flex w-full items-center justify-center'>
            {false ? (
              <div className='w-full flex justify-center bg-gray-100 blur h-full gray animated-pulse items-center'>
                loading...
              </div>
            ) : (
              <p className='text-xl mt-[1rem] md:text-2xl font-bold text-graydark'>
                {numberOfDonations}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumberOFDonationsWidget
