/**
 * Copyright 2023 Rafael Farias
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use client";

import React, { FunctionComponent } from "react";

import styleModule from "./OcHeader.module.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";

import ProfileComponent from "./ProfileComponent/ProfileComponent";
import SearchBarComponent from "./SearchBarComponent/SearchBarComponent";

interface OcHeaderProps {}

const pages = ["Browse", "New Song"];

const OcHeader: FunctionComponent<OcHeaderProps> = () => {
	return (
		<AppBar position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component={Link}
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "block" },
							fontWeight: 500,
							width: "auto",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						OPEN CHORD
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "block", md: "none" },
							flexGrow: 1,
							fontWeight: 500,
							width: "auto",

							color: "inherit",
							textDecoration: "none",
						}}
					>
						OPEN CHORD
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "flex" },
						}}
					>
						<SearchBarComponent />
					</Box>
					<ProfileComponent />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default OcHeader;
