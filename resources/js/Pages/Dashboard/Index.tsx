import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ManagePost from "./Partials/ManagePost";

export default function Index({ posts }: { posts: any[] }) {
    console.log(posts);
    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <ManagePost />
            </div>
        </AuthenticatedLayout>
    );
}
