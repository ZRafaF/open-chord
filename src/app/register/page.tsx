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
import { FunctionComponent, useEffect } from "react";

import Link from "next/link";

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Box,
	Grid,
	Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	useAuthState,
	useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";

import { toast, ToastContainer } from "react-toastify";
import OcEmailField from "@/components/OcEmailField/OcEmailField";
import OcPasswordField from "@/components/OcPasswordField/OcPasswordField";

interface RegisterPageProps {}

const theme = createTheme();

const RegisterPage: FunctionComponent<RegisterPageProps> = () => {
	const [user] = useAuthState(auth);
	const [
		createUserWithEmailAndPassword,
		userRegister,
		loadingRegister,
		errorRegister,
	] = useCreateUserWithEmailAndPassword(auth);
	const nextRouter = useRouter();

	useEffect(() => {
		if (user) {
			nextRouter.push("/");
		}
	}, [user, nextRouter]);

	const registerWithGoogle = async () => {
		signInWithPopup(auth, googleProvider).catch((error) => {
			var errorMessage = error.message;
			console.error(errorMessage);
		});
	};

	if (errorRegister) {
		const errorCode = errorRegister.code;
		console.log("ERRORR", errorCode);
		switch (errorCode) {
			case "auth/invalid-email":
				toast.error("Invalid email");
				break;
			case "auth/weak-password":
				toast.error("Password is too weak");
				break;

			default:
				toast.error(errorRegister.code);
				break;
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitEmail = data.get("email")?.toString();
		const submitPassword = data.get("password")?.toString();

		if (submitEmail === undefined) {
			toast.error("Invalid email.");
			return;
		}
		if (submitPassword === undefined) {
			toast.error("Invalid password.");
			return;
		}
		const checkedData: FormInterface = {
			email: submitEmail,
			password: submitPassword,
		};

		console.log(checkedData);

		createUserWithEmailAndPassword(checkedData.email, checkedData.password);
	};

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
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										autoComplete="username"
										name="username"
										required
										fullWidth
										id="username"
										label="Username"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<OcEmailField />
								</Grid>
								<Grid item xs={12}>
									<OcPasswordField />
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Register
							</Button>
							<Button
								type="submit"
								fullWidth
								variant="outlined"
								startIcon={<GoogleIcon />}
								sx={{ mt: 3, mb: 2 }}
								onClick={registerWithGoogle}
							>
								Register with google
							</Button>
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
