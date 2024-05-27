import GenerateLinkForm from "components/_signup/SignUpForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign up",
}

/**
 * payment link Signup page. Adds team members and provides payment link. If they are already signed up
 * it will provide the already created payment link
 *
 * @page
 * @returns {JSX.Element} The rendered React page.
 */
const PaymentLinkPage = (): JSX.Element => {
  return (
    <div>
      <GenerateLinkForm />
    </div>
  )
}

export default PaymentLinkPage
