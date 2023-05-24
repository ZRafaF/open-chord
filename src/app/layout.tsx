import OcHeader from "@/components/OcHeader/OcHeader";
import "./globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Roboto } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"],

	subsets: ["latin"],
});

export const metadata = {
	title: "Open Chord",
	description: "Free and open source Music Notation repository.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={roboto.className} style={{ margin: 0 }}>
				<OcHeader />

				{children}
			</body>
		</html>
	);
}
