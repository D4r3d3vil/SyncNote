import { error } from "@sveltejs/kit";
import { auth, db } from "./config";
import { doc, getDoc } from "firebase/firestore";

type Role = 'owner' | 'admin' | 'user'; // Add default role for clarity

export async function satisfiesRole(requiredRoles: Role[], idToken) {
            try {
                // Extract the Firebase ID token from the request headers
                const userRole = await getRole(idToken);
                console.log(userRole);
                // Check if the user's role meets the required permissions
                if (userRole === 'owner' || requiredRoles.includes(userRole)) {
                    return true
                } else {
                    return false;
                }
            } catch (err) {
                console.error("Error in roleRequired:", err);
                return false;
            }
}

export async function getRole(userId: string): Promise<Role | false> {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            return userData?.role || false; // Default to 'user' if role is missing
        } else {
            return false;
        }
    } catch (err) {
        console.error("Error fetching role:", err);
        return 'user'; // Fallback role
    }
}