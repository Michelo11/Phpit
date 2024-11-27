import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, User } from "@/types/index";
import { Head, usePage } from "@inertiajs/react";

export default function Followers({
    userFollowings,
    followers,
}: {
    userFollowings: Followable[];
    followers: User[];
}) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout header={<h2>{auth.user.name}'s Followers</h2>}>
            <Head title={`${auth.user.name}'s Followers`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <Users
                    title="Followers"
                    description="People who follow this user."
                    className="border border-card p-4 sm:rounded-xl w-full"
                    users={followers}
                    userFollowings={userFollowings.map(
                        (user) => user.followable
                    )}
                />
            </div>
        </AuthenticatedLayout>
    );
}
