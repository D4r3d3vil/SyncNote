import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, url }) => {
    if (url.pathname === '/login') {
        return;
    }
    const auth = cookies.get('auth');
    if (!auth) {
        console.log(auth)
        throw redirect(302, '/login'); // Use 302 for a temporary redirect
    }
    return {
        user: auth, // Optional: Pass user information if needed
        hideMenu: false
    };
};