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

import { checkDuplicateDisplayName } from "@/helper/firestore";

interface ResultReturn {
	hasError: boolean;
	errorMessage: string;
}

const regexTest = /^[A-Za-z0-9_]*$/;
const firstLetterRegexTest = /^[A-Za-z]*$/;

const checkUsername = async (
	username: string | undefined
): Promise<ResultReturn> => {
	if (username === undefined) {
		return {
			hasError: true,
			errorMessage: "",
		};
	}
	if (username.length == 0) {
		return {
			hasError: true,
			errorMessage: "",
		};
	}

	if (!firstLetterRegexTest.test(username[0])) {
		return {
			hasError: true,
			errorMessage:
				"The first character must be a letter from the latim alphabet",
		};
	}
	if (!regexTest.test(username)) {
		return {
			hasError: true,
			errorMessage:
				"Must contain only letters (a-z), numbers(0-9) or underscore(_)",
		};
	}
	const isDup = await checkDuplicateDisplayName(username);

	if (isDup) {
		return {
			hasError: true,
			errorMessage: "This username is already taken",
		};
	}
	return {
		hasError: false,
		errorMessage: "",
	};
};

export default checkUsername;
