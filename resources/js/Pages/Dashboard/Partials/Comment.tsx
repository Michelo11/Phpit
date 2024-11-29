import FollowButton from "@/Components/FollowButton";
import { Button } from "@/Components/Ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/Ui/Dropdown";
import { Comment, Post } from "@/types/index";
import { Link, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import ManageComment from "./ManageComment";

dayjs.extend(relativeTime);

export default function CommentComponent({
    comment,
    post,
    className = "",
    following,
}: {
    comment: Comment;
    post: Post;
    className?: string;
    following?: boolean;
}) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    return (
        <section className={className}>
            <header className="flex items-center justify-between">
                <div>
                    <h3>{comment.comment}</h3>

                    <div className="flex items-center gap-1">
                        <div className="mt-1 muted flex gap-1 items-center">
                            {dayjs(comment.created_at).fromNow()} by{" "}
                            <Link
                                className="flex gap-1 items-center hover:underline"
                                href={route("profile.index", comment.user.id)}
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
                </div>

                <div className="flex gap-4">
                    {auth.user && auth.user.id === comment.user.id && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-32">
                                    <ArrowDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-32">
                                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="w-full"
                                    >
                                        Edit
                                    </button>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    DELETE
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <FollowButton
                        userId={comment.user.id}
                        following={following}
                    />
                </div>
            </header>

            {editing && (
                <ManageComment
                    title="Edit comment"
                    description="Edit your comment."
                    className="mt-6"
                    comment={comment}
                    postItem={post}
                    action="update"
                    setEditing={setEditing}
                />
            )}
        </section>
    );
}
