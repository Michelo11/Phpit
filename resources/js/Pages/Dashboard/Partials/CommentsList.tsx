import { Comment, Post, User } from "@/types/index";
import CommentComponent from "./Comment";

interface CommentsListProps {
    className?: string;
    comments: Comment[];
    post: Post;
    title: string;
    description: string;
    userFollowings: User[];
}

export default function CommentsList({
    className = "",
    comments,
    post,
    title,
    description,
    userFollowings,
}: CommentsListProps) {
    return (
        <section className={className}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <div className="mt-6 space-y-6">
                {comments.length === 0 && (
                    <p className="muted">No comment found.</p>
                )}

                {comments.map((comment) => (
                    <CommentComponent
                        className="border border-card p-4 sm:rounded-xl"
                        comment={comment}
                        post={post}
                        key={comment.id}
                        following={userFollowings.some(
                            (follower) => follower.id === comment.user.id
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
