import React from 'react';
import { Calendar, Eye, Tag, ArrowLeft, Share2 } from 'lucide-react'; // Optional: icon er jonno lucide-react use kora hoyeche
import { Post } from '@/types';

const SingleBlogPage = ({ post }: { post: Post }) => {
    // Date format korar jonno
    const formattedDate = new Date(post.createAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Navigation / Back Button */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <button className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                    <ArrowLeft size={18} className="mr-2" />
                    <span>Back to Feed</span>
                </button>
            </div>

            <article className="max-w-4xl mx-auto px-4">
                {/* Header Section */}
                <header className="mb-8 text-center md:text-left">
                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        {post?.tag?.map((t, idx) => (
                            <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                {t}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-500 text-sm border-b border-gray-200 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} />
                            <span>{post.views} Views</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700 underline">Author ID: {post.authorId.substring(0, 8)}...</span>
                        </div> */}
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-12">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Main Body */}
                    <div className="md:col-span-8">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            <p className="text-xl text-gray-600 mb-6 font-light italic">
                                {post.content}
                            </p>

                            {/* Dummy text for visualization - real content ekhane ashbe */}
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Mastering the Modern Stack</h2>
                            <p className="mb-4">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        {/* Social Share */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"><Share2 size={20} /></button>
                            </div>
                            <p className="text-xs text-gray-400">Last updated: {new Date(post.updateAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="md:col-span-4">
                        <div className="sticky top-8 space-y-8">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-widest">About This Post</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Status</span>
                                        <span className="text-green-600 font-semibold">{post.status}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Total Posts</span>
                                        {/* <span className="font-medium">{post._count.posts}</span> */}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-600 p-6 rounded-xl text-white shadow-blue-200 shadow-xl">
                                <h4 className="font-bold mb-2">Subscribe to News</h4>
                                <p className="text-indigo-100 text-sm mb-4">Get the latest updates on MongoDB & SQL.</p>
                                <input type="email" placeholder="email@example.com" className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm mb-2 outline-none" />
                                <button className="w-full bg-black py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">Join Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default SingleBlogPage;