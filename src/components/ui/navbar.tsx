"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    FitFlow
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Button variant="outline" asChild>
                        <Link href="/partner-register">Become a Partner</Link>
                    </Button>


                    <Button variant="outline" asChild>
                        <Link href="/register">Signup</Link>
                    </Button>


                    <Button asChild>
                        <Link href="/signin">Signin</Link>
                    </Button>

                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle Menu"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t p-4 space-y-3">
                    <Button className="w-full" variant="outline" asChild>
                        <Link href="/partner-register">Become a Partner</Link>
                    </Button>

                    <Button className="w-full" variant="outline" asChild>
                        <Link href="/register">Signup</Link>
                    </Button>




                    <Button className="w-full" asChild>
                        <Link href="/signin">Signin</Link>
                    </Button>


                </div>
            )}
        </nav>
    )
}
