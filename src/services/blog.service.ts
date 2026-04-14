import { env } from "@/env"
import { Blog } from "@/types/blog.type";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

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

export const BlogPosts = {
    postCreate: async function (blogData: Blog) {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString()
                },
                body: JSON.stringify(blogData)
            });

            if (!res.ok) {
                throw new Error(`Failed to create blog post: ${res.statusText}`);
            } else {
                updateTag("blogPost")
            }

            return await res.json();
        } catch (error) {
            console.error("Error creating blog post:", error);
            throw error;
        }
    }
}


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
