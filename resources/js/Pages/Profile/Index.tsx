import PostsList from "@/Components/PostsList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Post } from "@/types";
import { User } from "@/types/index";
import { Head, usePage } from "@inertiajs/react";

export default function Index({
    posts,
    followers,
}: {
    followers: User[];
    posts: (Post & { user: { name: string; id: number; avatar: string } })[];
}) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout header={<h2>Profile {auth.user.name}</h2>}>
            <Head title={`Profile ${auth.user.name}`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <PostsList
                    posts={posts}
                    className="border border-card p-4 sm:rounded-xl"
                    title={`${auth.user.name}'s Posts`}
                    description="Here are some of the latest posts from this user."
                    followers={followers}
                />
            </div>
        </AuthenticatedLayout>
    );
}
