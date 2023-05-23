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

"use client";
import { FunctionComponent, useEffect, useState } from "react";

import Link from "next/link";

import { Avatar, CssBaseline, Box, Grid, Paper } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";

import { ToastContainer } from "react-toastify";
import OcEmailRegistration from "@/components/OcEmailRegistration/OcEmailRegistration";
import OcPickUsername from "@/components/OcPickUsername/OcPickUsername";
import OcRegisterWithGoogle from "@/components/OcRegisterWithGoogle/OcRegisterWithGoogle";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";

interface RegisterPageProps {}

const theme = createTheme();

const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
	const [user] = useAuthState(auth);

	const [username, setUsername] = useState<string | undefined>(undefined);

	const nextRouter = useRouter();

	useRedirectIfAuthenticated();

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer />

			<Grid
				container
				component="main"
				sx={{
					position: "absolute",
					height: "stretch",
				}}
			>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage:
							"url(https://source.unsplash.com/random)",
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={6}
					square
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Register
						</Typography>
						<Box sx={{ mt: 3 }}>
							{username ? (
								<OcEmailRegistration username={username} />
							) : (
								<OcPickUsername
									usernameCallback={(u) => {
										setUsername(u);
									}}
								/>
							)}
							<OcRegisterWithGoogle />
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link href="/login">
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

export default RegisterPage;
