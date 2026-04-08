import SingleBlogPage from "@/components/modules/homepage/SinglePost";
import { BlogService, singlePost } from "@/services/blog.service";
import { Post } from "@/types";

export async function generateStaticParams() {
    const posts = await BlogService.getBlogPost()
    return posts.data.result.map((post: Post) => ({
        id: post.post_id,
    })).splice(0, 3);
}

export default async function SingleBlog({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    console.log(id)
    const post = await singlePost.SinglePost(id);
    return (
        <div>
            <SingleBlogPage post={post}></SingleBlogPage>
        </div>
    )
}