import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Post } from "@/types";
import { User } from "@/types/index";
import { Head } from "@inertiajs/react";
import ManagePost from "../../Components/ManagePost";
import PostsList from "../../Components/PostsList";
import RecentUsers from "./Parcels/RecentUsers";

export default function Index({
    posts,
    followers,
    recentUsers,
}: {
    posts: (Post & { user: { name: string; id: number; avatar: string } })[];
    followers: User[];
    recentUsers: User[];
}) {
    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex lg:flex-row flex-col gap-4">
                <div className="flex flex-col gap-4 lg:w-2/3 w-full">
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

                <RecentUsers
                    recentUsers={recentUsers}
                    followers={followers}
                    className="border border-card p-4 sm:rounded-xl lg:w-1/3 w-full max-h-96"
                />
            </div>
        </AuthenticatedLayout>
    );
}
