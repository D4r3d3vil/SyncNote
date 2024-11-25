<script>
    import { auth } from "../../firebase/config.js";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { redirect } from '@sveltejs/kit';

    async function handleSignIn() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then(async student => {
            await fetch(`/api/auth?user=${JSON.stringify(student.user)}`);
        });
    }
</script>
<div class="h-[100vh] max-h-[100vh] w-full bg-[url(/classroom.jpg)] items-center bg-no-repeat bg-cover grid place-items-center overflow-hidden relative">
    <div class="absolute top-0 h-20 w-full bg-black z-30"></div>
    <div class="h-[200vh] w-16 rotate-45 z-50 bg-cyan-800 absolute left-52 overflow-hidden"></div>
    <div class="h-[200vh] w-8 rotate-45 z-50 bg-yellow-500 absolute left-[20rem] overflow-hidden"></div>
    <img src="/jeel.png" alt="" class="absolute hidden top-8 right-8 w-44 md:block z-40">
    <div class="z-50 bg-[url(/signinbg.png)] bg-opacity-0 w-72 h-[350px] text-center bg-opacity lg:ml-auto lg:mr-12">
        <p class="text-3xl pt-28">Hello There</p>
        <p class="text-xs">You must sign in to access the site</p>
        <button on:click={handleSignIn} class="w-[200px] h-10 rounded-2xl bg-white border border-gray-300 shadow-md flex items-center mt-10 ml-11">
            <img src="/google.svg" alt="Google Logo" class="ml-2 w-5 h-5" />
            <p class="pl-4 text-sm text-gray-700 font-medium tracking-tight">Sign in with Google</p>
        </button>
    </div>
</div>
