import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Checkbox } from "@/Components/Ui/Checkbox";
import { Input } from "@/Components/Ui/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-success">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
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
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(value: boolean) =>
                                setData("remember", value)
                            }
                        />

                        <span className="ms-2 muted">Remember me</span>
                    </label>
                </div>

                <div className="mt-4 gap-4 flex flex-col justify-end">
                    <div className="flex justify-between items-center">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="muted hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <p className="muted">
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className="hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>

                    <Button disabled={processing}>Log in</Button>
                </div>
            </form>

            <div className="mt-4">
                <Button asChild className="w-full" variant="outline">
                    <a href="/auth/redirect">Github</a>
                </Button>
            </div>
        </GuestLayout>
    );
}
