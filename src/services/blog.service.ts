import { env } from "@/env"

const API = env.BACKEND_URL;

interface GetParams {
    isFeatured?: boolean;
    search?: string
}

export const BlogService = {
    getBlogPost: async function (params?: GetParams) {
        try {

            const url = new URL(`${API}/posts`)
            // url.searchParams.append("key", "value")


            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value)
                    }
                })
            }
            console.log(url.toString())
            const result = await fetch(url.toString(), {
                next: { revalidate: 30 }
            });
            const data = result.json();
            return data;

        } catch (error) {
            console.log(error)
        }
    }
}