"use server"

import { BlogService } from "@/services/blog.service"

export const BlogPost = async () => {
    const data = await BlogService.getBlogPost();
    return data.data;
}