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

import {
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	FormLabel,
	Grid,
	Modal,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import CreatePlaylistCard from "./CreatePlaylistCard/CreatePlaylistCard";
import { ToastContainer, toast } from "react-toastify";

interface OcCreatePlaylistProps {}

const OcCreatePlaylist: FunctionComponent<OcCreatePlaylistProps> = () => {
	const [open, setOpen] = useState(false);
	const [playlistNameError, setPlaylistNameError] = useState<boolean>(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const isValidName = (name: string): boolean => {
		if (name.length) return true;
		return false;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const playlistName = data.get("playlist-name")?.toString();
		const description = data.get("description")?.toString();
		const visibility = data.get("visibility")?.toString();

		if (playlistName === undefined || !isValidName(playlistName)) {
			toast.error("Invalid playlist name.");
			return;
		}

		if (
			visibility === undefined ||
			(visibility !== "public" && visibility !== "private")
		) {
			toast.error("Invalid visibility.");
			return;
		}

		const formattedData: PlaylistFormInterface = {
			playlistName: playlistName,
			description: description,
			visibility: visibility,
		};
		handleClose();
		console.log(formattedData);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setPlaylistNameError(!isValidName(inputValue));
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<CreatePlaylistCard handleOpenModal={handleOpen} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
					<Paper
						variant="outlined"
						sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
					>
						<CssBaseline />
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography component="h1" variant="h5">
								NEW PLAYLIST
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
											required
											fullWidth
											id="playlist-name"
											label="Playlist name"
											name="playlist-name"
											autoComplete="name"
											onChange={handleChange}
											error={playlistNameError}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											id="description"
											label="Description"
											name="description"
											multiline
											rows={4}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormLabel id="playlist-visibility-selector-label">
											Visibility
										</FormLabel>

										<RadioGroup
											row
											aria-labelledby="playlist-visibility-selector"
											name="visibility"
											defaultValue="public"
										>
											<FormControlLabel
												value="public"
												control={<Radio />}
												label="Public"
											/>
											<FormControlLabel
												value="private"
												control={<Radio />}
												label="Private"
											/>
										</RadioGroup>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Button
											type="button"
											fullWidth
											variant="outlined"
											sx={{ mt: 3, mb: 2 }}
											onClick={handleClose}
										>
											Cancel
										</Button>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											sx={{ mt: 3, mb: 2 }}
										>
											Create
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Paper>
				</Container>
			</Modal>
		</React.Fragment>
	);
};

export default OcCreatePlaylist;
