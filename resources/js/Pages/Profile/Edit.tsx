import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { PageProps } from "@/types/index";

interface EditProps extends PageProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({
    mustVerifyEmail,
    status,
}: EditProps) {
    return (
        <AuthenticatedLayout header={<h2>Profile</h2>}>
            <Head title="Profile" />

            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="border border-card p-4 sm:rounded-xl"
                />

                <UpdatePasswordForm className="border border-card p-4 sm:rounded-xl" />

                <DeleteUserForm className="border border-card p-4 sm:rounded-xl" />
            </div>
        </AuthenticatedLayout>
    );
}
