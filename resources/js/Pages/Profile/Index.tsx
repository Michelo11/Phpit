import PostsList from "@/Components/PostsList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User, Post, Followable } from "@/types/index";
import { Head } from "@inertiajs/react";
import ShowInfo from "./Partials/ShowInfo";

export default function Index({
    posts,
    userFollowings,
    countFollowers,
    countFollowings,
    user,
}: {
    userFollowings: Followable[];
    countFollowers: number;
    countFollowings: number;
    posts: (Post & { user: User })[];
    user: User;
}) {
    return (
        <AuthenticatedLayout header={<h2>Profile {user.name}</h2>}>
            <Head title={`Profile ${user.name}`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <ShowInfo
                    title="User's info"
                    description="Here is some information about this user."
                    className="border border-card p-4 sm:rounded-xl"
                    countFollowers={countFollowers}
                    countFollowings={countFollowings}
                    userId={user.id}
                />

                <PostsList
                    posts={posts}
                    className="border border-card p-4 sm:rounded-xl"
                    title="User's posts"
                    description="Here are some of the latest posts from this user."
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                />
            </div>
        </AuthenticatedLayout>
    );
}
