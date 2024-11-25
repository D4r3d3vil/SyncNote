import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase/config.js'
let serializedData, lastUpdateTimestamp = Date.now() - 1000*60*60*24+1;
export async function load(){
	if(serializedData && Date.now() - lastUpdateTimestamp > 1000*60*60*24 || !serializedData) {
		serializedData = [];
		const schedules = await getDocs(collection(db, 'schedules'))
		serializedData[0] = schedules.docs.map(doc => ({
			id: doc.id, // Include the document ID
			...doc.data() // Spread the document's data
		}));
	}
	if(serializedData && Date.now() - lastUpdateTimestamp > 1000*60*60) {
		const pages = await getDocs(collection(db, 'pages'))
		serializedData[1] = pages.docs.map(doc => ({
			id: doc.id, // Include the document ID
			...doc.data() // Spread the document's data
		}));
		lastUpdateTimestamp = Date.now();
	}
	return {schedules: serializedData[0], pages: serializedData[1]};
}