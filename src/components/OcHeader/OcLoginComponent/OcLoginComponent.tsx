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

import { FunctionComponent, useState, MouseEvent } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

const settings = ["Profile", "Account", "Login", "Logout"];

// limitations under the License.
interface OcLoginComponentProps {}

const OcLoginComponent: FunctionComponent<OcLoginComponentProps> = () => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		alert("LOGOUT");
		handleCloseUserMenu();
	};

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open profile options">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="" src="/static/images/avatar/2.jpg" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<MenuItem onClick={handleCloseUserMenu}>
					<Typography>
						<Link
							href={`/profile`}
							style={{
								textDecoration: "none",
								color: "#000",
							}}
						>
							Profile
						</Link>
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleCloseUserMenu}>
					<Typography>
						<Link
							href={`/login`}
							style={{
								textDecoration: "none",
								color: "#000",
							}}
						>
							Login
						</Link>
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleCloseUserMenu}>
					<Typography>
						<Link
							href={`/my-songs`}
							style={{
								textDecoration: "none",
								color: "#000",
							}}
						>
							My songs
						</Link>
					</Typography>
				</MenuItem>

				<MenuItem onClick={handleLogout}>
					<Typography>Logout</Typography>
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default OcLoginComponent;
