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

import { Box, Button, Grid } from "@mui/material";
import { Dispatch, FormEvent, FunctionComponent, SetStateAction } from "react";
import OcUsernameField from "./OcUsernameField/OcUsernameField";
import { toast } from "react-toastify";
import { checkDuplicateDisplayName } from "@/helper/firestore";
interface OcPickUsernameProps {
	setUsername: Dispatch<SetStateAction<string | undefined>>;
}

const OcPickUsername: FunctionComponent<OcPickUsernameProps> = ({
	setUsername,
}) => {
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitUsername = data.get("username")?.toString();

		if (submitUsername === undefined) {
			toast.error("Invalid username.");
			return;
		}
		if (await checkDuplicateDisplayName(submitUsername)) {
			toast.error("This username is already taken.");
			return;
		}
		setUsername(submitUsername);
	};
	return (
		<Box component="form" noValidate onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<OcUsernameField />
				</Grid>
			</Grid>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
				Continue
			</Button>
		</Box>
	);
};

export default OcPickUsername;
