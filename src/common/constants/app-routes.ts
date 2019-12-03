export const appRoutes = {
    home: "/",
    login: "/login",
    register: "/register",
    memes: {
        submit: "/memes/submit",
        details: "/memes/details/:memeId",
    },
    profile: {
        my: "/profile/my",
        user: "/profile/:userId"
    }
}