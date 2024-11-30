import Pagination from "@/Components/Pagination";
import PostsList from "@/Components/PostsList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, PaginationMeta, Post, User } from "@/types/index";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import ShowInfo from "./Partials/ShowInfo";

interface IndexProps {
    posts: (Post & { user: User })[];
    userFollowings: Followable[];
    countFollowers: number;
    countFollowings: number;
    user: User;
    paginationMeta: PaginationMeta;
}

export default function Index({
    posts,
    userFollowings,
    countFollowers,
    countFollowings,
    user,
    paginationMeta,
}: IndexProps) {
    const [currentPosts, setCurrentPosts] = useState(posts);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);

    const handlePageChange = (page: number) => {
        router.get(
            route("profile.index", user.id),
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
                    posts={currentPosts}
                    className="border border-card p-4 sm:rounded-xl"
                    title="User's posts"
                    description="Here are some of the latest posts from this user."
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
