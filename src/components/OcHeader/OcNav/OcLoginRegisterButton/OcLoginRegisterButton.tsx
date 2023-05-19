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

import Link from "next/link";
import React, { FunctionComponent, useState } from "react";

// limitations under the License.
interface OcLoginRegisterButtonProps {}

const OcLoginRegisterButton: FunctionComponent<
	OcLoginRegisterButtonProps
> = () => {
	const openRegisterModal = () => {};
	return (
		<React.Fragment>
			<button type="button" className="btn btn-outline-light me-2">
				Login
			</button>
			<Link href={"/register"}>
				<button
					type="button"
					className="btn btn-warning"
					onClick={openRegisterModal}
				>
					Sign-up
				</button>
			</Link>
		</React.Fragment>
	);
};

export default OcLoginRegisterButton;
