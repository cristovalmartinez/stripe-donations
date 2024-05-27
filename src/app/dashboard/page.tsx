import TotalRevenueWidget from "components/_dashboard/TotalRevenueWidget"
import NumberOfDonationsWidget from "components/_dashboard/NumberOfDonationsWidget"
import DonationAverageWidget from "components/_dashboard/DonationAverageWidget"
import DonationSummaryWidget from "components/_dashboard/DonationSummaryWidget"
import Greeting from "components/ClientGreeting"
import { Breadcrumbs, Header } from "components/ui"
import { StripeService } from "services/stripe"
import type { Metadata } from "next"

const navData = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Team Members", href: "/team-members" },
]

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Dashboard",
}

/**
 * Dashboard page. application's main page
 *
 * @page
 * @returns {JSX.Element} The rendered React page.
 */
const DashboardPage = async (): Promise<JSX.Element> => {
  const data = await StripeService.paymentIntents.list()
  const filteredData = data.filter(
    (paymentIntent) =>
      paymentIntent.status === "succeeded" &&
      paymentIntent?.metadata.organization === "ABC"
  )

  return (
    <>
      <Header navData={navData} />
      <Breadcrumbs />
      <section className='py-[2rem] px-[1.5rem] md:px-[6rem]'>
        <Greeting />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-5 w-full'>
          <TotalRevenueWidget data={filteredData} />
          <NumberOfDonationsWidget data={filteredData} />
          <DonationAverageWidget data={filteredData} />
        </div>

        {/* bottom section */}
        <div className='grid grid-cols-11 mt-[3rem] gap-x-8 w-full'>
          <div className='col-span-full w-full'>
            <div className='flex justify-between items-center mb-5 w-full'>
              <h3 className='border-gray-900 font-semibold w-full'>
                Donations Summary
              </h3>
            </div>
            <DonationSummaryWidget data={filteredData} />
          </div>
        </div>
      </section>
    </>
  )
}

export default DashboardPage
