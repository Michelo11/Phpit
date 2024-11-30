import Pagination from "@/Components/Pagination";
import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, PaginationMeta, User } from "@/types/index";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

interface FollowingsProps {
    followings: Followable[];
    userFollowings: Followable[];
    user: User;
    paginationMeta: PaginationMeta;
}

export default function Followings({
    followings,
    userFollowings,
    user,
    paginationMeta,
}: FollowingsProps) {
    const [currentFollowings, setCurrentFollowings] = useState(followings);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);

    const handlePageChange = (page: number) => {
        router.get(
            route("followings.index", { id: user.id }),
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setCurrentFollowings(page.props.followings as Followable[]);
                    setCurrentPaginationMeta(
                        page.props.paginationMeta as PaginationMeta
                    );
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header={<h2>{user.name}'s followings</h2>}>
            <Head title={`${user.name}'s followings`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <Users
                    title="Followings"
                    description="People who this user follows."
                    className="border border-card p-4 sm:rounded-xl w-full"
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                    users={currentFollowings.map((user) => user.followable)}
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
