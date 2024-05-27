import Stripe from "stripe"

// Retrieve Stripe secret key based on the environment
const stripeSecretKey =
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_TEST_KEY

// Set the Stripe API version
const stripeApiVersion = "2022-11-15"

// Check if the Stripe secret key is provided
if (!stripeSecretKey) {
  throw new Error("Please add the Stripe secret key to your environment file")
}

// Initialize the Stripe instance
const stripe = new Stripe(stripeSecretKey, {
  // Set the Stripe API version
  // @ts-ignore
  apiVersion: stripeApiVersion,
})

// Exported service object containing Stripe API methods
export const StripeService = {
  // Price API
  price: {
    // Method to create a new price
    async create() {
      try {
        const price = await stripe.prices.create({
          currency: "usd",
          custom_unit_amount: { enabled: true, minimum: 50 },
          product: process.env.PRODUCT_ID,
        })
        return price
      } catch (error) {
        console.error("Error creating price:", error)
        throw error
      }
    },
  },

  // Payment Links API
  paymentLinks: {
    // Method to list all payment links
    async list() {
      try {
        const paymentLinks = await stripe.paymentLinks.list({
          limit: 3,
        })
        return paymentLinks
      } catch (error) {
        console.error("Error listing payment links:", error)
        throw error
      }
    },

    // Method to create a new payment link
    async create(data: any) {
      try {
        const paymentLink = await stripe.paymentLinks.create({
          customer_creation: "if_required",
          line_items: [
            {
              price: data.priceId,
              quantity: 1,
            },
          ],
          metadata: {
            name: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber ? data.phoneNumber : "",
            organization: "ABC",
          },
          payment_intent_data: {
            metadata: {
              name: data.fullName,
              email: data.email,
              phoneNumber: data.phoneNumber ? data.phoneNumber : "",
              organization: "ABC",
            },
          },
        })

        return paymentLink
      } catch (error) {
        console.error("Error creating payment link:", error)
        throw error
      }
    },

    // Method to update a payment link (for example upating the status to inactive)
    async update(paymentLinkId: string) {
      try {
        const paymentLink = await stripe.paymentLinks.update(paymentLinkId, {
          active: false,
        })
        return paymentLink
      } catch (error) {
        console.error("Error updating payment link:", error)
        throw error
      }
    },
  },

  // Payment Intents API
  paymentIntents: {
    // Method to list payment intents
    async list() {
      try {
        const paymentIntents = await stripe.paymentIntents.list({
          expand: ["data.latest_charge"],
        })
        return paymentIntents.data
      } catch (error) {
        console.error("Error listing payment intents:", error)
        throw error
      }
    },
  },

  // product API
  products: {
    // Method to create a new product
    async create(productData: any) {
      console.log(productData)
      try {
        const product = await stripe.products.create({
          name: productData.name,
          description: productData.description,
          images: [productData.imageUrl],
          url: productData.url,
        })
        return product
      } catch (error) {
        console.error("Error creating new product", error)
        throw error
      }
    },
  },
}
