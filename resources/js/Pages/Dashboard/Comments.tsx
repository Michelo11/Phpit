import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, Comment, Post } from "@/types";
import { Head } from "@inertiajs/react";
import ManageComment from "./Partials/ManageComment";
import CommentsList from "./Partials/CommentsList";

export default function CommentComponent({
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

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <ManageComment
                    action="create"
                    title="Create comment"
                    description="Create a new comment."
                    postItem={post}
                    className="border border-card p-4 sm:rounded-xl"
                />
                <CommentsList
                    comments={comments}
                    className="border border-card p-4 sm:rounded-xl"
                    title="Recent comments"
                    post={post}
                    description="Here are some of the recent comments."
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                />
            </div>
        </AuthenticatedLayout>
    );
}
