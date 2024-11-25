import { Post } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import ManagePost from "./ManagePost";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/Ui/Dropdown";
import { Button } from "@/Components/Ui/Button";

dayjs.extend(relativeTime);

export default function PostComponent({
    post,
    className = "",
}: {
    post: Post & { user: { name: string; id: number } };
    className?: string;
}) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);

    return (
        <section className={className}>
            <header className="flex items-center justify-between">
                <div>
                    <h3>{post.title}</h3>

                    <div className="flex items-center gap-1">
                        <p className="mt-1 muted">
                            {dayjs(post.created_at).fromNow()} by{" "}
                            {post.user.name}
                        </p>

                        {post.created_at !== post.updated_at && (
                            <p className="mt-1 muted">&middot; edited</p>
                        )}
                    </div>
                </div>

                {auth.user && auth.user.id === post.user.id && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-32">
                                <FaArrowDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                            <DropdownMenuLabel>Manage</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <button onClick={() => setEditing(true)} className="w-full">
                                    Edit
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route("posts.destroy", post.id)}
                                    method="delete"
                                >
                                    Delete
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </header>

            <p className="mt-6">{post.content}</p>

            {post.image && (
                <img
                    src={`storage/${post.image}`}
                    alt={post.title}
                    className="w-1/3 mt-6"
                    draggable={false}
                />
            )}

            {editing && (
                <ManagePost
                    title="Edit Post"
                    description="Edit your post."
                    className="mt-6"
                    postItem={post}
                    action="update"
                    setEditing={setEditing}
                />
            )}
        </section>
    );
}
