export const appRoutes = {
    home: "/",
    login: "/login",
    register: "/register",
    memes: {
        submit: "/memes/submit",
        details: "/memes/details/:memeId",
    },
    user: "/profile/:userId?"
}