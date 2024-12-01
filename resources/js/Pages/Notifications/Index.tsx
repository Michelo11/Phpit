import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import NotificationsList from "./Partials/NotificationsList";
import { Notification, PaginationMeta } from "@/types";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

interface IndexProps {
    notifications: Notification[];
    paginationMeta: PaginationMeta;
}

export default function Index({ notifications, paginationMeta }: IndexProps) {
    const { auth } = usePage().props;
    const [currentNotifications, setCurrentNotifications] =
        useState(notifications);
    const [currentPaginationMeta, setCurrentPaginationMeta] =
        useState(paginationMeta);
    const handlePageChange = (page: number) => {
        router.get(
            route("notifications.index"),
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setCurrentNotifications(page.props.posts as Notification[]);
                    setCurrentPaginationMeta(
                        page.props.paginationMeta as PaginationMeta
                    );
                },
            }
        );
    };

    return (
        <AuthenticatedLayout header={<h2>Notifications</h2>}>
            <Head title={`${auth.user.name}'s notifications`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <NotificationsList
                    notifications={currentNotifications}
                    className="border border-card p-4 sm:rounded-xl"
                    title="Recent notifications"
                    description="Here are some of the recent notifications."
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
