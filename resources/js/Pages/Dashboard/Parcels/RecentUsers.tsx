import FollowButton from "@/Components/FollowButton";
import { User } from "@/types/index";
import { Link } from "@inertiajs/react";

export default function RecentUsers({
    className = "",
    recentUsers,
    followers,
}: {
    className?: string;
    recentUsers: User[];
    followers: User[];
}) {
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h3>Recent Users</h3>

                <p className="mt-1 muted">
                    Users who recently joined the platform.
                </p>
            </header>

            <div className="flex flex-col gap-4">
                {recentUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between"
                    >
                        <Link
                            className="flex items-center gap-4 hover:underline"
                            href={`/profile/${user.id}`}
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
                            following={followers.some(
                                (follower) => follower.id === user.id
                            )}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
