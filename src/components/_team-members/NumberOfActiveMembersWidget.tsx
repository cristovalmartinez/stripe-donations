"use client"

const NumberOfActiveMembersWidget = ({ data }: { data: any }): JSX.Element => {
  const activeMembers = data.filter(
    (user: any) => user.status === "active"
  ).length
  return (
    <div className='rounded-xl border bg-white py-4 px-10 w-full'>
      <div className='flex gap-y-10 items-end justify-between w-full'>
        <div className='w-full'>
          <span className='border-b text-sm flex py-2 items-center justify-center font-normal text-gray-400 uppercase'>
            Active Members
          </span>
          <div className='h[4rem] flex w-full items-center justify-center'>
            <p className='text-xl mt-[1rem] md:text-2xl font-bold text-graydark'>
              {activeMembers}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumberOfActiveMembersWidget
