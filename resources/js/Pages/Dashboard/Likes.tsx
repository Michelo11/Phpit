import Pagination from "@/Components/Pagination";
import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, PaginationMeta, Post } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

interface LikesProps {
    post: Post;
    userFollowings: Followable[];
    paginationMeta: PaginationMeta;
}

export default function Likes({
    post,
    userFollowings,
    paginationMeta,
}: LikesProps) {
    const [currentLikers, setCurrentLikers] = useState(post.likers ?? []);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);

    const handlePageChange = (page: number) => {
        router.get(
            route("likes.index", { id: post.id }),
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setCurrentLikers(post.likers ?? []);
                    setCurrentPaginationMeta(paginationMeta as PaginationMeta);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header={<h2>{post.title}'s likes</h2>}>
            <Head title="Likes" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex lg:flex-row flex-col gap-4">
                <Users
                    users={currentLikers}
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                    className="border border-card p-4 sm:rounded-xl w-full"
                    title="Likes"
                    description="Users who liked this post."
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
