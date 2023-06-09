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

import { db } from "@/config/firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

export const playlistsCollectionRef = collection(db, "playlists");

export async function getFormattedPlaylistDocs(): Promise<PlaylistDoc[]> {
	try {
		const data = await getDocs(playlistsCollectionRef);

		const formattedData: PlaylistDoc[] = data.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as PlaylistDoc),
		}));
		return formattedData;
	} catch (error) {
		throw error;
	}
}

export async function getMyFormattedPlaylistDocs(
	uid: string
): Promise<PlaylistDoc[]> {
	const q = query(playlistsCollectionRef, where("uid", "==", uid));
	const querySnapshot = await getDocs(q);

	const formattedData: PlaylistDoc[] = querySnapshot.docs.map((doc) => {
		return {
			creator: doc.data().creator,
			dateOfCreation: doc.data().dateOfCreation,
			description: doc.data().description,
			name: doc.data().name,
			songIds: doc.data().songIds,
			uid: doc.data().uid,
			visibility: doc.data().visibility,
		} as PlaylistDoc;
	});
	return formattedData;
}

export async function createPlaylistDoc(newPlaylistDoc: PlaylistDoc) {
	return addDoc(playlistsCollectionRef, newPlaylistDoc);
}

export async function deletePlaylistDoc(id: string) {
	return deleteDoc(doc(db, "playlists", id));
}

const usersCollectionRef = collection(db, "users");

export async function checkDuplicateDisplayName(
	username: string
): Promise<boolean> {
	const q = query(usersCollectionRef, where("username", "==", username));
	const querySnapshot = await getDocs(q);

	return Boolean(querySnapshot.size);
}

export async function getFormattedUserDoc(uid: string): Promise<UserDoc[]> {
	const q = query(usersCollectionRef, where("uid", "==", uid));
	const querySnapshot = await getDocs(q);

	const formattedData: UserDoc[] = querySnapshot.docs.map((doc) => {
		return {
			uid: doc.data().uid,
			username: doc.data().username,
		} as UserDoc;
	});
	return formattedData;
}

export async function createUserDoc(uid: string, username: string) {
	const newUserData: UserDoc = {
		uid: uid,
		username: username,
	};

	return addDoc(usersCollectionRef, newUserData);
}
