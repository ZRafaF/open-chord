"use client";
import React, { FunctionComponent, useState } from "react";
import OcRegisterModal from "../OcRegisterModal/OcRegisterModal";
import OcNav from "./OcNav/OcNav";

interface OcHeaderProps {}

const OcHeader: FunctionComponent<OcHeaderProps> = () => {
	const [registerIsOpen, setRegisterIsOpen] = useState<boolean>(false);
	const openRegisterModal = () => {
		setRegisterIsOpen(true);
	};
	const closeRegisterModal = () => {
		setRegisterIsOpen(false);
	};
	return (
		<React.Fragment>
			<OcNav
				openRegisterModal={openRegisterModal}
				closeRegisterModal={closeRegisterModal}
			/>
			{registerIsOpen ? (
				<OcRegisterModal closeCallBack={closeRegisterModal} />
			) : (
				<></>
			)}
		</React.Fragment>
	);
};

export default OcHeader;
