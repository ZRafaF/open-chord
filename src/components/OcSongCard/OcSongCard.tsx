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

import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import Link from "next/link";

interface OcSongCardProps {}

const OcSongCard: FunctionComponent<OcSongCardProps> = () => {
	const authorButtonHanddler = (event: any) => {
		event.stopPropagation();
	};
	return (
		<Card sx={{ width: "100%" }} variant="outlined">
			<CardActionArea>
				<Link
					href={`/`}
					style={{
						textDecoration: "none",
					}}
				>
					<CardContent>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
							gap={2}
						>
							<Typography variant="h6">Song Name</Typography>
							<Divider orientation="vertical" flexItem />

							<Chip
								label="Clickable"
								color="primary"
								variant="outlined"
								onClick={authorButtonHanddler}
								onMouseDown={(e) => {
									e.stopPropagation();
								}}
							/>
							<Divider orientation="vertical" flexItem />
						</Box>
					</CardContent>
				</Link>
			</CardActionArea>
		</Card>
	);
};

export default OcSongCard;
