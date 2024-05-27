"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import {
  createPrice,
  createUser,
  checkAnyPriceExists,
  checkUserExists,
  updateUser,
} from "lib/database"
import { StripeService } from "services/stripe"

interface UserData {
  fullName: string
  email: string
  phoneNumber: string
}

interface SignInData {
  email: string
  password: string
}

// Signup user for new payment link
export async function signUp(userData: UserData) {
  if (!process.env.PRODUCT_ID)
    throw new Error(
      "add product id to your environment file to generate a new payment link."
    )
  try {
    validateUserData(userData)

    let userExists = await checkUserExists(userData.email)
    if (userExists) {
      return userExists
    }

    let priceExists = await checkAnyPriceExists()
    if (!priceExists) {
      const price = await StripeService.price.create()
      await createPrice(price)
      priceExists = await checkAnyPriceExists()
    }

    const paymentLink = await StripeService.paymentLinks.create({
      ...userData,
      priceId: priceExists?.priceId,
    })
    await createUser({
      ...userData,
      paymentLinkUrl: paymentLink.url,
      paymentLinkId: paymentLink.id,
      status: "active",
    })

    revalidatePath("/signup")

    return await checkUserExists(userData.email)
  } catch (error: any) {
    console.error("Error occurred during SignUp:", error)
    return {
      message: error.message,
      error: true,
    }
  }
}

// Deactivate payment link
export async function deactivatePaymentLink(
  userId: number,
  paymentLinkId: string
) {
  try {
    validateDeactivationData(userId, paymentLinkId)

    const paymentLink = await StripeService.paymentLinks.update(paymentLinkId)
    const user = await updateUser(userId, { status: "inactive" })

    return { ...paymentLink }
  } catch (error: any) {
    console.error("Error occurred during deactivation:", error)
    return {
      message: error.message,
      error: true,
    }
  }
}

// Sign in
export async function signIn(signInData: SignInData) {
  try {
    validateSignInData(signInData)

    const isValidUser = validateUser(signInData.email, signInData.password)

    if (isValidUser) {
      const token = generateToken(signInData.email)
      cookies().set("token", token, { secure: true })
      revalidatePath("/signin")
      return { message: "success", error: false }
    } else {
      return { message: "Invalid email or password", error: true }
    }
  } catch (error: any) {
    console.error("Error occurred during Signin:", error)
    return {
      message: error.message,
      error: true,
    }
  }
}

// add a new product
export async function addNewProduct(productData: any) {
  try {
    const product = await StripeService.products.create(productData)

    return {
      productId: product.id,
      message: `product ${product.id} has been created`,
      error: false,
    }
  } catch (error: any) {
    console.error("Error occurred during product creation", error)
    return {
      message: error.message,
      error: true,
    }
  }
}

function validateUserData(userData: UserData) {
  if (!userData.fullName || !userData.email) {
    throw new Error("Full name, email, and phone number are required")
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userData.email)) {
    throw new Error("Invalid email format")
  }
}

function validateDeactivationData(userId: number, paymentLinkId: string) {
  if (typeof userId !== "number" || typeof paymentLinkId !== "string") {
    throw new Error("Invalid data type for parameters")
  }
}

function validateSignInData(signInData: SignInData) {
  if (!signInData.email || !signInData.password) {
    throw new Error("Email and password are required")
  }
}

function validateUser(email: string, password: string) {
  return password === "russsolberg"
}

function generateToken(email: string) {
  const token = jwt.sign({ email }, "jwt-key", { expiresIn: "1h" })
  return token
}
