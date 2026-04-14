"use server"

import { BlogPosts, BlogService } from "@/services/blog.service"
import { Blog } from "@/types/blog.type";

export const BlogPost = async () => {
    const data = await BlogService.getBlogPost();
    return data.data;
};

export const BlogCreate = async (blog: Blog) => {
    try {
        const data = await BlogPosts.postCreate(blog);
        return data;
    } catch (error) {
        console.error("Error in BlogCreate action:", error);
        throw error;
    }
};