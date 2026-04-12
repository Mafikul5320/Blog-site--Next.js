import PostCard from "@/components/modules/homepage/PostCard";
import { BlogService } from "@/services/blog.service";
import { UserService } from "@/services/user.service";
import { Post } from "@/types";

export default async function Home() {

  const session = await UserService.getSession();
  console.log(session)
  const data = await BlogService.getBlogPost({
    isFeatured: false,
    search: ""
  });
  console.log(data?.data);
  return (
    <div className="grid grid-cols-4 w-8/10 mx-auto gap-5 py-5">
      {data?.data?.result?.map((onePost: Post) => (
        <PostCard key={onePost.post_id} post={onePost}></PostCard>
      ))}
    </div>
  );
}
