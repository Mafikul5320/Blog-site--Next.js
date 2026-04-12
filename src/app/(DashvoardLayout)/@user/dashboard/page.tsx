import BlogForm from "@/components/modules/blogForm/createBlogFrom";
import { BlogService } from "@/services/blog.service";
import { Post } from "@/types";

export default async function User() {
    const data = await BlogService.getBlogPost();

    return (
        <div>
            <BlogForm></BlogForm>
            {data?.data?.result?.map((onePost: Post) => (
                onePost.title
            ))}
        </div>
    )
}