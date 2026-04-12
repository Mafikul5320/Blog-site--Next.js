import { env } from "@/env"

const API = env.BACKEND_URL;

interface GetParams {
    isFeatured?: boolean;
    search?: string
}

export const BlogService = {
    getBlogPost: async function (params?: GetParams) {
        try {

            const url = new URL(`${API}/posts/all`)
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
                next: { tags: ["blogPost"] },
                cache: "no-store"
            });
            const data = result.json();
            return data;

        } catch (error) {
            console.log(error)
        }
    }
};

export const singlePost = {
    SinglePost: async function (id: string) {
        try {
            const result = await fetch(`${API}/posts/${id}`);
            const data = result.json();
            console.log(data, "service")
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}