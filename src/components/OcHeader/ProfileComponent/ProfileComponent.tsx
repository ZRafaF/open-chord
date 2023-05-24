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
"use client";

import { FunctionComponent, useState, MouseEvent, useEffect } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import { auth } from "@config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedMenuItens from "./LoggedMenuItens/LoggedMenuItens";
import GuestMenuItens from "./GuestMenuItens/GuestMenuItens";

// limitations under the License.
interface ProfileComponentProps {}

const emptyAvatarUrl = "/static/images/avatar/1.jpg";
const ProfileComponent: FunctionComponent<ProfileComponentProps> = () => {
	const [user, loadingUser, errorUser] = useAuthState(auth);
	const [avatarUrl, setAvatarUrl] = useState<string>(emptyAvatarUrl);

	useEffect(() => {
		const url = user?.photoURL;

		setAvatarUrl(url ? url : emptyAvatarUrl);
	}, [user]);

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open profile options">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="" src={avatarUrl} />
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
				{user ? (
					<LoggedMenuItens
						handleCloseUserMenu={handleCloseUserMenu}
					/>
				) : (
					<GuestMenuItens handleCloseUserMenu={handleCloseUserMenu} />
				)}
			</Menu>
		</Box>
	);
};

export default ProfileComponent;
