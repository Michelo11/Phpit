import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User, Post, Followable } from "@/types/index";
import { Head } from "@inertiajs/react";
import ManagePost from "../../Components/ManagePost";
import PostsList from "../../Components/PostsList";
import Users from "../../Components/Users";

export default function Index({
    posts,
    userFollowings,
    recentUsers,
}: {
    posts: (Post & { user: { name: string; id: number; avatar: string } })[];
    userFollowings: Followable[];
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
                        userFollowings={userFollowings.map(
                            (user) => user.followable
                        )}
                    />
                </div>

                <Users
                    users={recentUsers}
                    userFollowings={userFollowings.map((user) => user.followable)}
                    className="border border-card p-4 sm:rounded-xl lg:w-1/3 w-full max-h-96"
                    title="Recent Users"
                    description="Users who recently joined the platform."
                />
            </div>
        </AuthenticatedLayout>
    );
}
