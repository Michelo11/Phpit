import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import { Transition } from "@headlessui/react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

interface UpdateProfileInformationProps {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: UpdateProfileInformationProps) {
    const user = usePage().props.auth.user;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { data, setData, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        avatar: null as File | null,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route("profile.update"), {
            ...data,
            _method: "patch",
        });
    };

    return (
        <section className={className}>
            <header>
                <h3>Profile Information</h3>

                <p className="mt-1 muted">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    ref={fileInputRef}
                    onChange={(e) => {
                        if (e.target.files) {
                            setData("avatar", e.target.files[0]);
                        }
                    }}
                    hidden
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <img
                        src={
                            data.avatar
                                ? URL.createObjectURL(data.avatar)
                                : user.avatar
                        }
                        alt="Profile photo"
                        className="rounded-xl h-20 w-20"
                        draggable="false"
                    />
                </button>

                <div>
                    <Input
                        placeholder="Name"
                        id="name"
                        name="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Input
                        placeholder="Email"
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 muted">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="muted w-full"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-success">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
