import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form
                onSubmit={submit}
                className="border border-card p-4 sm:rounded-xl"
            >
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

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Input
                        placeholder="Password"
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <Button className="mt-4 w-full" disabled={processing}>
                    Reset Password
                </Button>
            </form>
        </GuestLayout>
    );
}
