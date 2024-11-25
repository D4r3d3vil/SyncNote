import {error} from "@sveltejs/kit";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {db} from "../../../firebase/config";

export async function GET({url}){
    const userParam = url.searchParams.get("user")
    if(!userParam) return error(404, 'User param non existant');
    const user = JSON.parse(url.searchParams.get("user")!);
    if(await firstTimeUser(user)) await createUser(user)
    return new Response()
}
async function firstTimeUser(user) {
    const userDoc = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDoc);
    return !userSnapshot.exists();
}
async function createUser(user) {
    const userDoc = doc(db, "users", user.uid);

    try {
        // Create a new document for the user
        await setDoc(userDoc, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Anonymous",
            photoURL: user.photoURL || null,
            createdAt: new Date().toISOString(),
            role: 'user'
        });
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
}