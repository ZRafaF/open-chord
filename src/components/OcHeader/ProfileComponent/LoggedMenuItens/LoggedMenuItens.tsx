// Copyright 2023 Rafael Farias
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";

import { auth } from "@/config/firebase";
import { Box, MenuItem, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

interface LoggedMenuItensProps {
	handleCloseUserMenu: () => void;
}

const LoggedMenuItens: FunctionComponent<LoggedMenuItensProps> = ({
	handleCloseUserMenu,
}) => {
	const [signOut, loading, error] = useSignOut(auth);
	const [user] = useAuthState(auth);

	if (error) {
		return (
			<div>
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (loading) {
		return <p>Loading...</p>;
	}
	const handleLogout = async () => {
		try {
			await signOut();
		} catch (err) {
			console.error(err);
		}
		handleCloseUserMenu();
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
				}}
				p={1}
			>
				<Paper
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
					}}
					variant="outlined"
				>
					<Typography px={1} variant="caption">
						Logged as:
					</Typography>
					<Typography px={1} color={"primary"}>
						{user?.displayName}
					</Typography>
				</Paper>
			</Box>
			<MenuItem onClick={handleCloseUserMenu}>
				<Typography>
					<Link
						href={`/profile`}
						style={{
							textDecoration: "none",
							color: "#000",
						}}
					>
						Profile
					</Link>
				</Typography>
			</MenuItem>
			<MenuItem onClick={handleCloseUserMenu}>
				<Typography>
					<Link
						href={`/my-songs`}
						style={{
							textDecoration: "none",
							color: "#000",
						}}
					>
						My songs
					</Link>
				</Typography>
			</MenuItem>

			<MenuItem onClick={handleCloseUserMenu}>
				<Typography>
					<Link
						href={`/my-playlists`}
						style={{
							textDecoration: "none",
							color: "#000",
						}}
					>
						My playlists
					</Link>
				</Typography>
			</MenuItem>

			<MenuItem onClick={handleLogout}>
				<Typography>Logout</Typography>
			</MenuItem>
		</React.Fragment>
	);
};

export default LoggedMenuItens;
