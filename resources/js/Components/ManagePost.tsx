import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Textarea } from "@/Components/Ui/Textarea";
import { Post } from "@/types/index";
import { Transition } from "@headlessui/react";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

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
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [customError, setCustomError] = useState<string | null>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
        clearErrors,
    } = useForm({
        title: postItem?.title || "",
        content: postItem?.content || "",
        image: null as File | null,
    });

    const validateForm = () => {
        if (!data.content && !data.image) {
            setCustomError("Please provide either content or an image.");
            return false;
        }
        setCustomError(null);
        return true;
    };

    const createPost: FormEventHandler = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        post(route("posts.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const updatePost: FormEventHandler = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        router.post(
            route("posts.update", postItem?.id),
            {
                ...data,
                _method: "patch",
            },
            {
                onSuccess: () => {
                    if (setEditing) setEditing(false);
                    reset();
                    clearErrors();
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
                    />

                    <InputError message={errors.content} className="mt-2" />
                </div>

                <input
                    type="file"
                    name="image"
                    id="image"
                    ref={fileInputRef}
                    onChange={(e) => {
                        if (e.target.files) {
                            setData("image", e.target.files[0]);
                        }
                    }}
                    hidden
                />

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {data.image ? "Change" : "Upload"} Image
                        </Button>

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

                {customError && (
                    <InputError message={customError} className="mt-2" />
                )}
            </form>
        </section>
    );
}
