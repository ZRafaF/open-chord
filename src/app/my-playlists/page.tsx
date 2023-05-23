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

import React, { FunctionComponent, use, useEffect, useState } from "react";

import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import {
	getFormattedPlaylistDocs,
	playlistsCollectionRef,
} from "@/helper/firestore";
import OcCreatePlaylist from "@/components/OcCreatePlaylist/OcCreatePlaylist";
import { query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useRedirectIfNotAuthenticated from "@/hooks/useRedirectIfNotAuthenticated";
import OcPlaylistCard from "@/components/OcPlaylistCard/OcPlaylistCard";
import { formatPlaylistDoc } from "@/helper/formatDocs";

interface MyPlaylistsPageProps {}

const MyPlaylistsPage: FunctionComponent<MyPlaylistsPageProps> = () => {
	const [playlistDocs, setPlaylistDocs] = useState<PlaylistDoc[]>([]);
	const [user] = useAuthState(auth);

	const getUid = (): string => {
		const uid = user?.uid;
		if (typeof uid === "string") return uid;
		return "";
	};

	const [PlaylistsCollection, loadingPlaylists, errorPlaylists] =
		useCollection(
			query(playlistsCollectionRef, where("uid", "==", getUid())),
			{
				snapshotListenOptions: { includeMetadataChanges: true },
			}
		);

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
		if (PlaylistsCollection === undefined) return;
		const cards = PlaylistsCollection.docs.map((doc) => {
			return (
				<OcPlaylistCard
					key={doc.id}
					id={doc.id}
					content={formatPlaylistDoc(doc)}
				/>
			);
		});

		return cards;
	};

	return (
		<Container fixed sx={{ my: 3 }}>
			<Grid container spacing={4}>
				<OcCreatePlaylist />
				{makeCards()}
			</Grid>
		</Container>
	);
};

export default MyPlaylistsPage;
