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

import React, { FunctionComponent } from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePlaylistDoc } from "@/helper/firestore";

interface OcPlaylistCardProps {
	id: string;
	content: PlaylistDoc;
}

const OcPlaylistCard: FunctionComponent<OcPlaylistCardProps> = ({
	id,
	content,
}) => {
	const deleteThis = async () => {
		console.log(await deletePlaylistDoc(id));
	};

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<CardActionArea
					sx={{
						height: "100%",
					}}
				>
					<CardContent sx={{ flexGrow: 1 }}>
						<Typography gutterBottom variant="h5" component="h2">
							{content.name}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							Playlist made by: {content.creator}
						</Typography>
						<Typography>{content.description} </Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small">
						View {content.songIds.length} song(s)
					</Button>
					<Button size="small">Edit</Button>
					<Button
						size="small"
						variant="outlined"
						startIcon={<DeleteIcon />}
						color="error"
						onClick={deleteThis}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default OcPlaylistCard;
