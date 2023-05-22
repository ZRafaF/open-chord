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

import { TextField } from "@mui/material";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import checkUsername from "../../../helper/usernameChecker";

interface OcUsernameFieldProps {}

const OcUsernameField: FunctionComponent<OcUsernameFieldProps> = ({}) => {
	const [error, setError] = useState<boolean>(false);
	const [helperMessage, setHelperMessage] = useState<string>("");
	const debounced = useDebouncedCallback(
		async (value: string) => {
			checkUsername(value)
				.then((response) => {
					setError(response.hasError);
					setHelperMessage(response.errorMessage);
				})
				.catch((e) => {
					console.error(e);
				});
		},
		// delay in ms
		1000
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		debounced(event.target.value);
	};

	return (
		<TextField
			error={error}
			required
			fullWidth
			id="username"
			label="Username"
			name="username"
			autoComplete="username"
			onChange={handleChange}
			helperText={helperMessage}
		/>
	);
};

export default OcUsernameField;
