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

import { FormEvent, FunctionComponent } from "react";
import OcPasswordField from "../OcPasswordField/OcPasswordField";
import OcEmailField from "../OcEmailField/OcEmailField";

import { Button, Box, Grid } from "@mui/material";
import {
	useCreateUserWithEmailAndPassword,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import { toast } from "react-toastify";
import { createUserDoc } from "@/helper/firestore";

interface FormInterface {
	email: string;
	username: string;
	password: string;
}

interface OcEmailRegistrationProps {
	username: string;
}

const OcEmailRegistration: FunctionComponent<OcEmailRegistrationProps> = ({
	username,
}) => {
	const [updateProfile, updatingProfile, errorProfile] =
		useUpdateProfile(auth);
	const [
		createUserWithEmailAndPassword,
		userRegister,
		loadingRegister,
		errorRegister,
	] = useCreateUserWithEmailAndPassword(auth);

	if (errorRegister) {
		const errorCode = errorRegister.code;
		console.error(errorCode);
		switch (errorCode) {
			case "auth/invalid-email":
				toast.error("Invalid email");
				break;
			case "auth/weak-password":
				toast.error("Password is too weak");
				break;
			case "auth/email-already-in-use":
				toast.error("Email is already in use");
				break;
			case "auth/operation-not-allowed":
				toast.error("Error during sign up");
				break;
			default:
				toast.error(errorRegister.code);
				break;
		}
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitEmail = data.get("email")?.toString();
		const submitUsername = username;
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
			username: submitUsername,
			password: submitPassword,
		};

		createUserWithEmailAndPassword(checkedData.email, checkedData.password)
			.then((result) => {
				const uid = result?.user.uid;
				if (uid === undefined) throw "undefined uid";
				updateProfile({
					displayName: checkedData.username,
				});
				createUserDoc(uid, username);
			})
			.catch((e) => {
				console.error(e);
			});
	};
	return (
		<Box component="form" noValidate onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<OcEmailField />
				</Grid>
				<Grid item xs={12}>
					<OcPasswordField />
				</Grid>
			</Grid>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
				Register
			</Button>
		</Box>
	);
};

export default OcEmailRegistration;
