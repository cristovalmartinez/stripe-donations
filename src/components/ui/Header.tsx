"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Global header component
 *
 * @component
 * @returns {JSX.Element} The rendered React components.
 */
const Header = ({ navData }: { navData: any }): JSX.Element => {
  const pathname = usePathname()

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0'>
      <nav
        className='mx-auto font-bold flex max-w-7xl gap-x-4 items-center justify-center p-6 lg:px-20'
        aria-label='Global'>
        {navData.map((link: any) => {
          return (
            <Link
              key={link.label}
              className={`${
                pathname === link.href ? "text-gray-900" : "text-gray-300"
              }`}
              href={link.href}>
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
