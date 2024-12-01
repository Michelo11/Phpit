import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Textarea } from "@/Components/Ui/Textarea";
import { Comment, Post } from "@/types/index";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface ManageCommentProps {
    className?: string;
    comment?: Comment;
    postItem: Post;
    action: "create" | "update";
    setEditing?: (editing: boolean) => void;
    title: string;
    description: string;
}

export default function ManageComment({
    className = "",
    comment,
    postItem,
    action,
    setEditing,
    title,
    description,
}: ManageCommentProps) {
    const {
        data,
        setData,
        errors,
        post,
        patch,
        reset,
        processing,
        recentlySuccessful,
        clearErrors,
    } = useForm({
        content: comment?.comment || "",
    });
    const createComment: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("comments.store", postItem?.id), {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    const updateComment: FormEventHandler = (e) => {
        e.preventDefault();

        patch(
            route("comments.update", {
                id: postItem?.id,
                comment: comment?.id,
            }),
            {
                ...data,
                preserveState: false,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    if (setEditing) setEditing(false);
                },
            }
        );
    };

    return (
        <section className={className}>
            <header>
                <h3>{title}</h3>
                <p className="mt-1 muted">{description}</p>
            </header>

            <form
                onSubmit={action === "create" ? createComment : updateComment}
                className="mt-6 space-y-6"
            >
                <div>
                    <Textarea
                        placeholder="Content"
                        id="content"
                        name="content"
                        className="mt-1 block w-full"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                    />

                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>

                        {action === "update" && (
                            <button
                                type="reset"
                                onClick={() => {
                                    if (setEditing) setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="muted">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
