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
import React, { ChangeEvent, FunctionComponent, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

// limitations under the License.
interface OcPasswordFieldProps {}

const OcPasswordField: FunctionComponent<OcPasswordFieldProps> = () => {
	const [error, setError] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");

	const isValidPassword = (checkPassword: string): boolean => {
		if (checkPassword.length >= 6) return false;
		return true;
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setError(isValidPassword(inputValue));
		setPassword(inputValue);
	};

	return (
		<React.Fragment>
			<TextField
				error={error}
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="new-password"
				onChange={handleChange}
			/>
			<PasswordStrengthBar password={password} minLength={6} />
		</React.Fragment>
	);
};

export default OcPasswordField;
