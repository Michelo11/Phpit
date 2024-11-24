import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Textarea } from "@/Components/Ui/Textarea";
import { Post } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ManagePost({
    className = "",
    postItem,
    title,
    description,
    action,
    setEditing,
}: {
    className?: string;
    title: string;
    postItem?: Post & { user: { name: string; id: number } };
    description: string;
    action: "create" | "update";
    setEditing?: (editing: boolean) => void;
}) {
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
        title: postItem?.title || "",
        content: postItem?.content || "",
    });

    const createPost: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("posts.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const updatePost: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("posts.update", postItem?.id), {
            onSuccess: () => {
                if (setEditing) setEditing(false);
                reset();
                clearErrors();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h3>{title}</h3>

                <p className="mt-1 muted">{description}</p>
            </header>

            <form
                onSubmit={action === "create" ? createPost : updatePost}
                className="mt-6 space-y-6"
            >
                <div>
                    <Input
                        placeholder="Title"
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        required
                        maxLength={50}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div>
                    <Textarea
                        placeholder="Content"
                        id="content"
                        name="content"
                        className="mt-1 block w-full"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        required
                    />

                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>

                        {action === "update" && (
                            <button
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
