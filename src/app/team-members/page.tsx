import NumberOfActiveMembersWidget from "components/_team-members/NumberOfActiveMembersWidget"
import TeamMemberSummaryWidget from "components/_team-members/TeamMembersSummaryWidget"
import { Header, Button, Breadcrumbs } from "components/ui"
import { getAllUsers } from "lib/database"
import { StripeService } from "services/stripe"
import AddProduct from "components/_team-members/AddProduct"
import Link from "next/link"

const navData = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Team Members", href: "/team-members" },
]

export const dynamic = "force-dynamic"

/**
 * Team members page. List all team members active or inactive
 *
 * @page
 * @returns {JSX.Element} The rendered React components.
 */
const TeamMembersPage = async (): Promise<JSX.Element> => {
  const data: any = await getAllUsers()
  const paymentIntents = await StripeService.paymentIntents.list()

  return (
    <>
      <Header navData={navData} />
      <Breadcrumbs />
      <section className='py-10 px-[1.5rem] md:px-[4rem]'>
        <div className='grid grid-cols-1 sm:grid-cols-3 items-start gap-5 w-full'>
          <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row'>
            <Link className='mx-auto' href='/payment-links'>
              <Button
                className='order-first'
                text='Add new member'
                type='submit'
              />
            </Link>
            <AddProduct />
          </div>
          <NumberOfActiveMembersWidget data={data} />
        </div>
        <div className='grid grid-cols-11 mt-[3rem] gap-x-8'>
          <div className='col-span-full'>
            <div className='flex justify-between items-center mb-5 w-full'>
              <h3 className='border-gray-900 font-semibold w-full'>
                Team Members
              </h3>
            </div>
            <TeamMemberSummaryWidget
              data={data}
              paymentIntents={paymentIntents}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default TeamMembersPage
