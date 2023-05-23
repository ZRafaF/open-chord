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

import React, { FunctionComponent, useEffect, useState } from "react";

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import { getFormattedPlaylistDocs } from "@/helper/firestore";
import useRedirectIfNotAuthenticated from "@/hooks/useRedirectIfNotAuthenticated";

interface MySongsPageProps {}

const MySongsPage: FunctionComponent<MySongsPageProps> = () => {
	const [playlistDocs, setPlaylistDocs] = useState<PlaylistDoc[]>([]);

	useRedirectIfNotAuthenticated();

	const getPlaylistList = async () => {
		try {
			setPlaylistDocs(await getFormattedPlaylistDocs());
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getPlaylistList();
	}, []);

	const makeCards = () => {
		const cards = playlistDocs.map((playlist) => {
			return (
				<Grid item key={playlist.name} xs={12} sm={6} md={4}>
					<Card
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
							>
								{playlist.name}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								Playlist made by: {playlist.creator}
							</Typography>
							<Typography>{playlist.description} </Typography>
						</CardContent>
						<CardActions>
							<Button size="small">
								View {playlist.songIds.length} song(s)
							</Button>
							<Button size="small">Edit</Button>
						</CardActions>
					</Card>
				</Grid>
			);
		});

		return cards;
	};

	return <Container fixed>My songs</Container>;
};

export default MySongsPage;
