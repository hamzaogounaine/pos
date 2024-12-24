"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header/header"
import { Sidebar } from "./sidebar/sidebar"
import { ThemeProvider } from "next-themes"

export function Dashboard({ children }) {
  const path = usePathname()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className=" items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}