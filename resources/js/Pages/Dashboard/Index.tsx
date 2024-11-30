import ManagePost from "@/Components/ManagePost";
import Pagination from "@/Components/Pagination";
import PostsList from "@/Components/PostsList";
import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, PaginationMeta, Post, User } from "@/types/index";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

interface IndexProps {
    posts: (Post & { user: User })[];
    userFollowings: Followable[];
    recentUsers: User[];
    paginationMeta: PaginationMeta;
}

export default function Index({
    posts,
    userFollowings,
    recentUsers,
    paginationMeta,
}: IndexProps) {
    const [currentPosts, setCurrentPosts] = useState(posts);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);

    const handlePageChange = (page: number) => {
        router.get(
            route("posts.index"),
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setCurrentPosts(
                        page.props.posts as (Post & { user: User })[]
                    );
                    setCurrentPaginationMeta(
                        page.props.paginationMeta as PaginationMeta
                    );
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex lg:flex-row flex-col gap-4">
                <div className="flex flex-col gap-4 lg:w-2/3 w-full">
                    {paginationMeta.current_page === 1 && (
                        <ManagePost
                            title="Create post"
                            description="Create a new post."
                            action="create"
                            className="border border-card p-4 sm:rounded-xl"
                        />
                    )}
                    <PostsList
                        posts={currentPosts}
                        className="border border-card p-4 sm:rounded-xl"
                        title="Recent posts"
                        description="Here are some of the latest posts from your friends."
                        userFollowings={userFollowings.map(
                            (user) => user.followable
                        )}
                    />
                </div>

                <Users
                    users={recentUsers}
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                    className="border border-card p-4 sm:rounded-xl lg:w-1/3 w-full max-h-96"
                    title="Recent Users"
                    description="Users who recently joined the platform."
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
