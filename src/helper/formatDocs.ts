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

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const formatPlaylistDoc = (
	doc: QueryDocumentSnapshot<DocumentData>
): PlaylistDoc => {
	const data = doc.data();
	const newPlaylistDoc: PlaylistDoc = {
		creator: data.creator,
		dateOfCreation: data.dateOfCreation,
		description: data.description,
		name: data.name,
		songIds: data.songIds,
		uid: data.uid,
		visibility: data.visibility,
	};
	return newPlaylistDoc;
};
