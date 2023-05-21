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

import { checkDuplicateDisplayName } from "@/helper/firestore";
import { TextField } from "@mui/material";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// limitations under the License.
interface OcUsernameFieldProps {}

const OcUsernameField: FunctionComponent<OcUsernameFieldProps> = () => {
	const [error, setError] = useState<boolean>(false);
	const [helperMessage, setHelperMessage] = useState<string>("");
	const debounced = useDebouncedCallback(
		async (value) => {
			const isDup = await checkDuplicateDisplayName(value);
			if (isDup) {
				setError(true);
				setHelperMessage("This username is already taken");
			} else if (value.length == 0) {
				setError(true);
			} else {
				setError(false);
				setHelperMessage("");
			}
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
