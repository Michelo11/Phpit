import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, Post } from "@/types";
import { Head } from "@inertiajs/react";

export default function Likes({
    post,
    userFollowings,
}: {
    post: Post;
    userFollowings: Followable[];
}) {
    return (
        <AuthenticatedLayout header={<h2>{post.title}'s likes</h2>}>
            <Head title="Likes" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex lg:flex-row flex-col gap-4">
                <Users
                    users={post.likers ?? []}
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                    className="border border-card p-4 sm:rounded-xl w-full"
                    title="Likes"
                    description="Users who liked this post."
                />
            </div>
        </AuthenticatedLayout>
    );
}
