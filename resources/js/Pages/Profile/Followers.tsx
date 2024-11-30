import Pagination from "@/Components/Pagination";
import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, PaginationMeta, User } from "@/types/index";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

interface FollowersProps {
    userFollowings: Followable[];
    followers: User[];
    user: User;
    paginationMeta: PaginationMeta;
}

export default function Followers({
    userFollowings,
    followers,
    user,
    paginationMeta,
}: FollowersProps) {
    const [currentFollowers, setCurrentFollowers] = useState(followers);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);

    const handlePageChange = (page: number) => {
        router.get(
            route("followers.index", { id: user.id }),
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setCurrentFollowers(page.props.followers as User[]);
                    setCurrentPaginationMeta(
                        page.props.paginationMeta as PaginationMeta
                    );
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header={<h2>{user.name}'s followers</h2>}>
            <Head title={`${user.name}'s followers`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <Users
                    title="Followers"
                    description="People who follow this user."
                    className="border border-card p-4 sm:rounded-xl w-full"
                    users={currentFollowers}
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
