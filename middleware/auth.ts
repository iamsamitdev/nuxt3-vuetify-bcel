export default defineNuxtRouteMiddleware((to, from) => {

    // get token from cookie
    const token = useCookie('token')

    // if no token, redirect to login
    if (!token.value) {
        return navigateTo('/')
    }

})
