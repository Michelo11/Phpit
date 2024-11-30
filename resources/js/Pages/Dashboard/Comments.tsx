import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Comment, Followable, PaginationMeta, Post } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import CommentsList from "./Partials/CommentsList";
import ManageComment from "./Partials/ManageComment";

interface CommentsProps {
    post: Post;
    comments: Comment[];
    userFollowings: Followable[];
    paginationMeta: PaginationMeta;
}

export default function Comments({
    post,
    comments,
    userFollowings,
    paginationMeta,
}: CommentsProps) {
    const [currentComments, setCurrentComments] = useState(comments);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);

    const handlePageChange = (page: number) => {
        router.get(
            route("comments.index", { id: post.id }),
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setCurrentComments(page.props.comments as Comment[]);
                    setCurrentPaginationMeta(
                        page.props.paginationMeta as PaginationMeta
                    );
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header={<h2>{post.title}'s comments</h2>}>
            <Head title="Comments" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                {paginationMeta.current_page === 1 && (
                    <ManageComment
                        action="create"
                        title="Create comment"
                        description="Create a new comment."
                        postItem={post}
                        className="border border-card p-4 sm:rounded-xl"
                    />
                )}
                <CommentsList
                    comments={currentComments}
                    className="border border-card p-4 sm:rounded-xl"
                    title="Recent comments"
                    post={post}
                    description="Here are some of the recent comments."
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                />
            </div>

            {currentPaginationMeta.total > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        paginationMeta={currentPaginationMeta}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </AuthenticatedLayout>
    );
}
