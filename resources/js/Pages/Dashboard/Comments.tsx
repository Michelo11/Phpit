import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, Comment, Post } from "@/types";
import { Head } from "@inertiajs/react";
import CommentsComponent from "./Partials/Comments";

export default function Likes({
    post,
    comments,
    userFollowings,
}: {
    post: Post;
    comments: Comment[];
    userFollowings: Followable[];
}) {
    return (
        <AuthenticatedLayout header={<h2>{post.title}'s comments</h2>}>
            <Head title="Comments" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex lg:flex-row flex-col gap-4">
                <div className="border border-card p-4 sm:rounded-xl w-full">
                    <CommentsComponent
                        comments={comments}
                        userFollowings={userFollowings.map(
                            (user) => user.followable
                        )}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
