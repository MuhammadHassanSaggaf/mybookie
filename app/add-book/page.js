"use client";
import React from "react";
import Navbar from "../src/components/NavBar";
import AddBooks from "../src/components/AddBooks";
import Footer from "../src/components/Footer";

export default function AddBookPage() {
	return (
		<div className="scroll-smooth flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-1 p-6">
				<AddBooks />
			</main>
			<Footer />
		</div>
	);
}
