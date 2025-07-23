"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const navLinks = [
		{ href: "/", label: "Dashboard" },
		{ href: "/favourites", label: "Favourites" },
		{ href: "/borrowed", label: "Borrowed" },
		{ href: "/add-book", label: "Add Book" },
	];

	return (
		<nav
			className="bg-[#0f172a] border-b border-white/10
    shadow-md
    sticky top-0 z-50 text-white "
		>
			<div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
				{/* Logo / Brand */}
				<Link
					href="/"
					className="text-2xl font-bold hover:-translate-y-[1px] transition-transform duration-200"
				>
					My Bookie
				</Link>

				{/* Desktop Links */}
				<ul className="hidden md:flex justify-end items-center  space-x-6">
					{navLinks.map(({ href, label }) => (
						<li
							key={href}
							className="hover:-translate-y-[1px] transition-transform duration-200 "
						>
							<Link
								href={href}
								className="text-lg   hover:text-white transition duration-200   "
							>
								{label}
							</Link>
						</li>
					))}
				</ul>

				{/* Mobile Hamburger */}
				<button
					className="md:hidden focus:outline-none"
					onClick={() => setOpen(!open)}
					aria-label="Toggle menu"
				>
					{open ? (
						<XMarkIcon className="h-6 w-6 text-white" />
					) : (
						<Bars3Icon className="h-6 w-6 text-white" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{open && (
				<ul className="md:hidden bg-[#0f172a] border-t border-white/10 text-white shadow-lg">
					{navLinks.map(({ href, label }) => (
						<li
							key={`mobile-${href}`}
							className="px-4 py-3 hover:bg-white/10 transition"
						>
							<Link href={href} className="block w-full">
								{label}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
}
