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
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import useRedirectIfNotAuthenticated from "@/hooks/useRedirectIfNotAuthenticated";
import OcSongCard from "@/components/OcSongCard/OcSongCard";

interface MySongsPageProps {}

const MySongsPage: FunctionComponent<MySongsPageProps> = () => {
	useRedirectIfNotAuthenticated();

	return (
		<Container fixed sx={{ my: 3 }}>
			<Stack
				direction={{ xs: "column", sm: "column", md: "row" }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
			>
				<Paper
					sx={{
						width: "100%",
						py: 2,
					}}
					elevation={3}
				>
					<Typography variant="h4" align="center">
						Favorites
					</Typography>
					<List aria-label="mailbox folders">
						<ListItem>
							<OcSongCard />
						</ListItem>
						<ListItem>
							<OcSongCard />
						</ListItem>
						<ListItem>
							<OcSongCard />
						</ListItem>
						<ListItem>
							<OcSongCard />
						</ListItem>
					</List>
				</Paper>
				<List
					sx={{
						width: "100%",
						bgcolor: "background.paper",
					}}
					component="nav"
					aria-label="mailbox folders"
				>
					<ListItem divider>
						<OcSongCard />
					</ListItem>
					<ListItem divider>
						<OcSongCard />
					</ListItem>
					<ListItem divider>
						<OcSongCard />
					</ListItem>
					<ListItem divider>
						<OcSongCard />
					</ListItem>
				</List>
			</Stack>
		</Container>
	);
};

export default MySongsPage;
