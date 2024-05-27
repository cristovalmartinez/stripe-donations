"use client"

import { usePathname } from "next/navigation"

interface Breadcrumb {
  title: string
  url: string
}

export default function BreadCrumbs() {
  const path = usePathname()

  function extractBreadcrumbs(path: string): Breadcrumb[] {
    const parts = path.split("/").filter((part) => part !== "")
    let breadcrumbs: Breadcrumb[] = []

    parts.reduce((prev, curr, index) => {
      const url = prev + "/" + curr
      const title = curr.replaceAll("-", " ")
      breadcrumbs.push({ title, url })
      return url
    }, "")

    return breadcrumbs
  }

  const breadcrumbs = extractBreadcrumbs(path)
  const displayTitle = breadcrumbs.length > 0 ? breadcrumbs[0].title : ""

  return (
    <div className='font-medium z-10 underline-offset-8 text-xl md:text-2xl text-gray-900 flex items-center justify-start my-5 px-[1.5rem] md:px-[10rem] gap-x-1 capitalize'>
      {path !== "/" && <>{displayTitle}</>}
    </div>
  )
}
