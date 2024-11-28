import FollowButton from "@/Components/FollowButton";
import { User } from "@/types/index";
import { Link } from "@inertiajs/react";

export default function Users({
    className = "",
    users,
    userFollowings,
    title,
    description,
}: {
    className?: string;
    users: User[];
    userFollowings: User[];
    title: string;
    description: string;
}) {
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <div className="flex flex-col gap-4">
                {users.length === 0 && (
                    <p className="muted">No users to show.</p>
                )}

                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between"
                    >
                        <Link
                            className="flex items-center gap-4 hover:underline"
                            href={route("profile.view", user.id)}
                        >
                            <img
                                src={user.avatar}
                                alt="Profile photo"
                                className="w-10 h-10 rounded-md"
                                draggable="false"
                            />
                            {user.name}
                        </Link>

                        <FollowButton
                            userId={user.id}
                            following={userFollowings.some(
                                (follower) => follower.id === user.id
                            )}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
