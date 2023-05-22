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

import React, { FunctionComponent, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { createUserDoc, getFormattedUserDoc } from "@/helper/firestore";
import {
	useAuthState,
	useSignOut,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	FormControlLabel,
	FormLabel,
	Grid,
	Link,
	Modal,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OcPickUsername from "../OcPickUsername/OcPickUsername";

interface OcHasUsernameTrackerProps {}

const OcHasUsernameTracker: FunctionComponent<
	OcHasUsernameTrackerProps
> = () => {
	const [open, setOpen] = useState(false);

	const [user, loadingUser, errorUser] = useAuthState(auth);
	const [signOut] = useSignOut(auth);
	const [updateProfile, updatingProfile, errorProfile] =
		useUpdateProfile(auth);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const checkIfUserHasUsername = async () => {
			const uid = user?.uid;
			if (uid === undefined) {
				return;
			}
			const userDb = await getFormattedUserDoc(uid);
			if (!userDb.length) {
				setOpen(true);
			}
		};
		checkIfUserHasUsername();
	}, [user]);

	const usernameCallback = async (response: string) => {
		const uid = user?.uid;
		if (uid === undefined) throw "undefined uid";

		updateProfile({
			displayName: response,
		}).catch((e) => {
			console.log(e);
		});
		await createUserDoc(uid, response).catch((e) => {
			console.log(e);
		});
		handleClose();
	};

	const handleSignOut = async () => {
		await signOut();
		handleClose();
	};

	return (
		<React.Fragment>
			<Modal
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Container component="main" maxWidth="sm">
					<Paper
						variant="outlined"
						sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
					>
						<Grid item>
							<Box
								sx={{
									my: 4,
									mx: 4,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Avatar
									sx={{ m: 1, bgcolor: "secondary.main" }}
								>
									<AccountCircleIcon />
								</Avatar>
								<Typography component="h1" variant="h5">
									New Username
								</Typography>
								<Typography>
									You need to choose an username to continue!
								</Typography>
								<Box sx={{ mt: 3 }}>
									<OcPickUsername
										usernameCallback={usernameCallback}
									/>
								</Box>
							</Box>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link
										component="button"
										variant="body2"
										onClick={handleSignOut}
									>
										I don&apos;t want to do it now (logout).
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Container>
			</Modal>
		</React.Fragment>
	);
};

export default OcHasUsernameTracker;
