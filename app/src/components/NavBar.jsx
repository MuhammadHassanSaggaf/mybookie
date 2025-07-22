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
		<nav className="bg-white shadow-md">
			<div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
				{/* Logo / Brand */}
				<Link
					href="/"
					className="text-2xl font-bold text-gray-800 hover:text-gray-600 hover:-translate-y-[1px] transition-transform duration-200"
				>
					My Bookie
				</Link>

				{/* Desktop Links */}
				<ul className="hidden md:flex justify-end items-center space-x-6">
					{navLinks.map(({ href, label }) => (
						<li key={href} className="hover:-translate-y-[1px] transition-transform duration-200 ">
							<Link
								href={href}
								className="text-lg text-gray-700 hover:text-gray-900  transition duration-200   "
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
						<XMarkIcon className="h-6 w-6 text-gray-800" />
					) : (
						<Bars3Icon className="h-6 w-6 text-gray-800" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{open && (
				<ul className="md:hidden bg-white border-t border-gray-200">
					{navLinks.map(({ href, label }) => (
						<li key={`mobile-${href}`} className="px-4 py-2">
							<Link href={href} className="block">
								{label}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
}
