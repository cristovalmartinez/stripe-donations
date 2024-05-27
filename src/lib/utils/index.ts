export function handleDateFormat(timeStamp: number) {
  const unixTimestamp = timeStamp

  // Convert Unix timestamp to a Date object
  const createdDate = new Date(unixTimestamp * 1000)

  // Create options for formatting in PST
  const options = {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }

  // Format the date as a string in PST
  // @ts-ignore
  const formattedCreatedAt = new Intl.DateTimeFormat("en-US", options).format(
    createdDate
  )

  return formattedCreatedAt
}

export function handlePhoneNumberFormat(value: string) {
  // Require Digits only
  const phoneNumberDigits = value.replace(/\D/g, "")

  // Restrict input to only 10 digits
  const formattedPhoneNumber = phoneNumberDigits.slice(0, 10)

  // Format phone number xxx-xxx-xxxx
  let formValue = ""
  for (let i = 0; i < formattedPhoneNumber.length; i++) {
    if (i === 3 || i === 6) {
      formValue += "-"
    }
    formValue += formattedPhoneNumber[i]
  }

  return formValue
}
