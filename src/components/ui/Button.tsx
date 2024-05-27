import React, { ButtonHTMLAttributes } from "react"
import { Icons } from "components/ui"

/**
 * Button component
 *
 * @component
 * @returns {JSX.Element} The rendered React components.
 */
const Button = ({
  type,
  disabled,
  loading,
  text,
  className,
  onClick,
}: {
  type: "submit" | "button" | "reset"
  text: string
  disabled?: boolean
  loading?: boolean
  className?: string
  onClick?: any
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`min-w-max inline-block disabled:bg-opacity-40 h-16 disabled:shadow-sm lowercase shadow-lg hover:shadow-none transition ease duration-300 shadow-blue-400 bg-blue-900 py-5 rounded-full text-blue-100 flex items-center justify-center px-6 text-lg mx-auto font-medium ${className}`}>
      {loading ? <Icons.FaSpinner className='animate-spin' /> : text}
    </button>
  )
}

export default Button
