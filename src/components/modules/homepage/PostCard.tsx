import { Post } from "@/types";

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Thumbnail Section */}
            <div className="relative h-48 w-full">
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                {post.isFeatured && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                    </span>
                )}
                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                    {post.views} Views
                </span>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex gap-2 mb-3">
                    {post.tag.map((t, index) => (
                        <span key={index} className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                            #{t}
                        </span>
                    ))}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.content}
                </p>

                <hr className="mb-4 border-gray-100" />

                {/* Footer Section */}
                <div className="flex justify-between items-center">
                    <div className="text-[11px] text-gray-400">
                        <p>Created: {new Date(post.createAt).toLocaleDateString()}</p>
                    </div>
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        Read More →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;