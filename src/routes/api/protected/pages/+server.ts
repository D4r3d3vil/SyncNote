import { db } from "../../../../firebase/config";
import { collection, doc, getDoc, getDocs, query, where, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { error, json, redirect } from '@sveltejs/kit';
import { satisfiesRole } from "../../../../firebase/auth";

export async function GET({ url, request }) {
    if(!(await checkPermissions(['user', 'admin'], request))) return error(403, {message: 'Unauthorized'});
        const pageQ = url.searchParams.get('page');
    if (!pageQ) {
        const catQ = url.searchParams.get('category');
        if (!catQ) return json(await getPosts(''));
        return json(await getPosts(catQ));
    }

    const page = await getPost(pageQ);
    if (!page) return error(404, 'Page not found');
    return json(page);
}

export async function POST({ url, request }) {
    if(!(await checkPermissions(['user', 'admin'], url))) return error(403, {message: 'Unauthorized'});

    const { content, title, author, category } = await request.json();
    const col = collection(db, "pages");
    const docRef = await addDoc(col, { content, title, author, category });

    return redirect(301, `/page/${docRef.id}`);
}

export async function PATCH({ url, request }) {
    if(!(await checkPermissions(['user', 'admin'], url))) return error(403, {message: 'Unauthorized'});

    const { content, title, author, category, id } = await request.json();
    const docRef = doc(db, "pages", id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return error(404, 'Page not found');

    await setDoc(docRef, { content, title, author, category });
    return redirect(301, `/page/${id}`);
}

export async function DELETE({ url, request }) {
    if(!(await checkPermissions(['user', 'admin'], url))) return error(403, {message: 'Unauthorized'});

    const pageId = url.searchParams.get('id');
    if (!pageId) return error(400, 'Page ID is required');

    const docRef = doc(db, "pages", pageId);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return error(404, 'Page not found');

    await deleteDoc(docRef);
    return json({ success: true, message: 'Page deleted successfully' });
}

async function getPost(postId) {
    const docRef = doc(db, "pages", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else return null;
}

async function getPosts(category) {
    const col = collection(db, "pages");

    let querySnapshot;
    if (category === '') {
        querySnapshot = await getDocs(col);
    } else {
        const q = query(col, where("category", "==", category));
        querySnapshot = await getDocs(q);
    }

    const posts = [];
    querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
    });

    return posts;
}

async function checkPermissions(roles, request){
    const authHead = request.headers.get('Authorization');
    if(!authHead) return false;
    const id = authHead.split('Bearer ')[1];
    const allowed = await satisfiesRole(roles, id);
    return allowed;
}