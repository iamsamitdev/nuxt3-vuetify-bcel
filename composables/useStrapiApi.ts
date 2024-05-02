import type { ProductResponse , MetaResponse } from '@/types/product'

export default() => {

    const router = useRouter()

    // get strapi url from runtime config
    const config = useRuntimeConfig()
    const STRAPI_URL: string = config.public.strapi.url

    // get token from cookies
    const token = useCookie('token')

    // headers for strapi api
    const headers = {
        'Accept': 'application/json',
        "Authorization": `Bearer ${token.value}`
    }

    const fetchWithTokenCheck = async <T>(url: any, options: any) => {
        const response = await useFetch(url, options);

        if (response.error.value && response.error.value.status === 400) {
            // Token is expired or invalid, redirect to login page
            router.push('/');
        }

        return response
    }

    // Get All Categories
    const getCategories = async () => {
        return fetchWithTokenCheck(`${STRAPI_URL}/categories?sort[0]=id%3Adesc&populate=*`, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
    }

    // Get All Products
    const getProducts = async (page: number, pagesize: number) => {
        return fetchWithTokenCheck<ProductResponse & MetaResponse>(`${STRAPI_URL}/products?sort[0]=id%3Adesc&pagination[page]=${page}&pagination[pageSize]=${pagesize}&populate=*`, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
    }

    return {
        getCategories,
        getProducts
    }

}