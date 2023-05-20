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

import { TextField } from "@mui/material";
import { ChangeEvent, FunctionComponent, useState } from "react";

// limitations under the License.
interface OcEmailFieldProps {}

const OcEmailField: FunctionComponent<OcEmailFieldProps> = () => {
	const [error, setError] = useState<boolean>(false);

	function isValidEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email);
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!isValidEmail(event.target.value)) {
			setError(true);
		} else {
			setError(false);
		}
	};

	return (
		<TextField
			error={error}
			required
			fullWidth
			id="email"
			label="Email Address"
			name="email"
			autoComplete="email"
			onChange={handleChange}
		/>
	);
};

export default OcEmailField;
