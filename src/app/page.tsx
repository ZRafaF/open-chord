"use client";
import OcHasUsernameTracker from "@/components/OcHasUsernameTracker/OcHasUsernameTracker";
import { Container } from "@mui/material";

export default function Home() {
	return (
		<Container style={{ backgroundColor: "red" }} fixed>
			<OcHasUsernameTracker />
			<main style={{ height: "150vh" }}>as</main>
		</Container>
	);
}
