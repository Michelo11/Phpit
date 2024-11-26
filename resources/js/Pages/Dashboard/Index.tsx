import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Post } from "@/types";
import { Head } from "@inertiajs/react";
import ManagePost from "../../Components/ManagePost";
import PostsList from "../../Components/PostsList";

export default function Index({
    posts,
    followers,
}: {
    posts: (Post & { user: { name: string; id: number; avatar: string } })[];
    followers: { id: number }[];
}) {
    console.log(followers);
    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <ManagePost
                    title="Create Post"
                    description="Create a new post."
                    action="create"
                    className="border border-card p-4 sm:rounded-xl"
                />
                <PostsList
                    posts={posts}
                    className="border border-card p-4 sm:rounded-xl"
                    title="Recent Posts"
                    description="Here are some of the latest posts from your friends."
                    followers={followers}
                />
            </div>
        </AuthenticatedLayout>
    );
}
