import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
        </AuthenticatedLayout>
    );
}
