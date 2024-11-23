import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Textarea } from "@/Components/Ui/Textarea";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export default function ManagePost({ className = "" }: { className?: string }) {
    const titleInput = useRef<HTMLInputElement>(null);
    const contentInput = useRef<HTMLTextAreaElement>(null);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        content: "",
    });

    const createPost: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("posts.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.title) titleInput.current?.focus();
                else if (errors.content) contentInput.current?.focus();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h3>Create Post</h3>

                <p className="mt-1 muted">
                    Write a new post to share with your friends.
                </p>
            </header>

            <form onSubmit={createPost} className="mt-6 space-y-6">
                <div>
                    <Input
                        placeholder="Title"
                        type="text"
                        id="title"
                        ref={titleInput}
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
                        ref={contentInput}
                        name="content"
                        className="mt-1 block w-full"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        required
                    />

                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

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
