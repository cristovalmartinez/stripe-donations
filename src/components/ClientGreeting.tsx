"use client"

const ClientGreeting = (): JSX.Element => {
  // Function to get the current time
  const getCurrentTimePeriod = () => {
    const currentHour = new Date().getHours()
    if (currentHour >= 1 && currentHour < 12) {
      return "morning"
    } else {
      return "evening"
    }
  }

  return (
    <div className='flex justify-start space-x-1 items-center my-6'>
      <span className='block text-sm font-medium'>
        {`Good ${getCurrentTimePeriod()},`}
      </span>
      <p className='text-gray-400 text-sm block'>
        Today&#39;s summary for {new Date().toLocaleDateString()}
      </p>
    </div>
  )
}

export default ClientGreeting
