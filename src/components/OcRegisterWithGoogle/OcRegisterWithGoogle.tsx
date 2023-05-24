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

import { FunctionComponent } from "react";

import { auth } from "@/config/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { getFormattedUserDoc } from "@/helper/firestore";

interface OcRegisterWithGoogleProps {}

const OcRegisterWithGoogle: FunctionComponent<
	OcRegisterWithGoogleProps
> = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	const registerWithGoogle = async () => {
		signInWithGoogle();
	};
	return (
		<Button
			type="submit"
			fullWidth
			variant="outlined"
			startIcon={<GoogleIcon />}
			sx={{ mt: 3, mb: 2 }}
			onClick={registerWithGoogle}
		>
			Login with google
		</Button>
	);
};

export default OcRegisterWithGoogle;
