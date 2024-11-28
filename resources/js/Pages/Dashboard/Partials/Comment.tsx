import FollowButton from "@/Components/FollowButton";
import { Comment, User } from "@/types";
import { Link } from "@inertiajs/react";

export default function CommentComponent({
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

            {comments.map((comment) => (
                <div className="space-y-3 mt-6" key={comment.id}>
                    <div className="flex items-center justify-between">
                        <Link
                            className="flex items-center gap-4 hover:underline"
                            href={route("profile.view", comment.user.id)}
                        >
                            <img
                                src={comment.user.avatar}
                                alt="Profile photo"
                                className="w-10 h-10 rounded-md"
                                draggable="false"
                            />
                            {comment.user.name}
                        </Link>

                        <FollowButton
                            userId={comment.user.id}
                            following={userFollowings.some(
                                (follower) => follower.id === comment.user.id
                            )}
                        />
                    </div>

                    <p>{comment.comment}</p>
                </div>
            ))}
        </section>
    );
}
