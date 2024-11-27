import Users from "@/Components/Users";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Followable, User } from "@/types/index";
import { Head } from "@inertiajs/react";

export default function Followings({
    followings,
    userFollowings,
    user,
}: {
    followings: Followable[];
    userFollowings: Followable[];
    user: User;
}) {
    return (
        <AuthenticatedLayout header={<h2>{user.name}'s Followings</h2>}>
            <Head title={`${user.name}'s Followings`} />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                <Users
                    title="Followings"
                    description="People who this user follows."
                    className="border border-card p-4 sm:rounded-xl w-full"
                    userFollowings={userFollowings.map((user) => user.followable)}
                    users={followings.map((user) => user.followable)}
                />
            </div>
        </AuthenticatedLayout>
    );
}
