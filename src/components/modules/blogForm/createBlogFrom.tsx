
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidateTag, updateTag } from "next/cache";

export default function BlogForm() {
    const API = env.BACKEND_URL;

    const FromAction = async (fromData: FormData) => {
        "use server"
        const title = fromData.get("title") as string;
        const content = fromData.get("description") as string;
        const thumbnail = fromData.get("thumbnailurl") as string;
        const tag = fromData.get("tag") as string;
        const blgoData = {
            title,
            content,
            thumbnail,
            tag: tag?.split(",").map(t => t.trim()).filter(t => t !== "")

        };

        const cookieStore = await cookies();

        const res = await fetch(`${API}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                cookie: cookieStore.toString()
            },
            body: JSON.stringify(blgoData)
        })
        if (res.ok) {
            // revalidateTag("blogPost", "max");
            updateTag("blogPost")
        }
        console.log(res)
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-xl shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create Blog Post</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6 " action={FromAction}>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input name="title" placeholder="Enter blog title" />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                name="description"
                                placeholder="Write your blog content..."
                                className="min-h-[120px]"
                            />
                        </div>

                        {/* Thumbnail  url*/}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thumbnail url</label>
                            <Input name="thumbnailurl" placeholder="Enter tag" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tag</label>
                            <Input name="tag" placeholder="Enter tag" />
                        </div>

                        <Button type="submit" className="w-full">
                            Post Blog
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
