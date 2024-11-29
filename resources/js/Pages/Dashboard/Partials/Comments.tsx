import FollowButton from "@/Components/FollowButton";
import { Comment, User } from "@/types";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function CommentsComponent({
    className = "",
    comments,
    userFollowings,
}: {
    className?: string;
    comments: Comment[];
    userFollowings: User[];
}) {
    return (
        <section className={`${className}`}>
            <header>
                <h3>Comments</h3>

                <p className="mt-1 muted">Users who commented on this post.</p>
            </header>

            {comments.length === 0 && (
                <p className="muted mt-6">No comments to show.</p>
            )}

            <div className="mt-6 flex flex-col gap-6">
                {comments.map((comment) => (
                    <div
                        className="border border-card p-4 sm:rounded-xl"
                        key={comment.id}
                    >
                        <h3>{comment.comment}</h3>

                        <div className="flex items-center gap-1">
                            <div className="mt-1 muted flex gap-1 items-center">
                                {dayjs(comment.created_at).fromNow()} by{" "}
                                <Link
                                    className="flex gap-1 items-center hover:underline"
                                    href={route(
                                        "profile.index",
                                        comment.user.id
                                    )}
                                >
                                    <img
                                        src={comment.user.avatar}
                                        alt="Profile photo"
                                        className="w-6 h-6 rounded-md"
                                        draggable="false"
                                    />
                                    {comment.user.name}
                                </Link>
                            </div>

                            {comment.created_at !== comment.updated_at && (
                                <p className="mt-1 muted">&middot; edited</p>
                            )}
                        </div>

                        <FollowButton
                            userId={comment.user.id}
                            following={userFollowings.some(
                                (following) => following.id === comment.user.id
                            )}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
