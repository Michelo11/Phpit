import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Post } from "@/types";
import { Head } from "@inertiajs/react";
import ManagePost from "./Partials/ManagePost";
import RecentPosts from "./Partials/RecentPosts";

export default function Index({
    posts,
}: {
    posts: (Post & { user: { name: string; id: number } })[];
}) {
    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <ManagePost
                    title="Create Post"
                    description="Create a new post."
                    action="create"
                />
                <RecentPosts posts={posts} />
            </div>
        </AuthenticatedLayout>
    );
}
