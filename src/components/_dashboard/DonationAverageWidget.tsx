"use client"

const DonationAverageWidget = ({ data }: { data: any }): JSX.Element => {
  const filteredData = data.filter(
    (paymentIntent: any) => paymentIntent.status === "succeeded"
  )
  const total = filteredData.reduce(
    (acc: number, pi: any) => acc + pi.amount,
    0
  )
  // Convert total amount from cents to dollars
  const totalInDollars: any = (total / 100).toFixed(2)
  const numberOfDonations = filteredData.length

  // Calculate average amount
  const average =
    numberOfDonations > 0 ? (totalInDollars / numberOfDonations).toFixed(2) : 0

  return (
    <div className='rounded-xl border bg-white py-4 px-10 w-full'>
      <div className='flex gap-y-10 items-end justify-between w-full'>
        <div className='w-full'>
          <span className='border-b text-sm flex py-2 items-center justify-center font-normal text-gray-400 uppercase'>
            Average Donation Amount
          </span>
          <div className='h-[4rem] flex w-full items-center justify-center'>
            <p className='text-xl mt-[1rem] md:text-2xl font-bold text-graydark'>
              ${average}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationAverageWidget
