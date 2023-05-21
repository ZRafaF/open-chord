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
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import { FunctionComponent } from "react";

interface CreatePlaylistCardProps {
	handleOpenModal: () => void;
}

const CreatePlaylistCard: FunctionComponent<CreatePlaylistCardProps> = ({
	handleOpenModal,
}) => {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					bgcolor: "#f2f2f2",
				}}
			>
				<CardActionArea
					sx={{
						height: "100%",
						flexDirection: "column",
					}}
					onClick={handleOpenModal}
				>
					<CardContent
						sx={{
							flexGrow: 1,
						}}
					>
						<Typography gutterBottom variant="h5" component="h2">
							Create a new playlist
						</Typography>
						<CardMedia
							component="img"
							alt="Add icon"
							height={120}
							src="/add-plus.svg"
						/>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default CreatePlaylistCard;
