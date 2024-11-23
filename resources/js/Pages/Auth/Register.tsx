import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
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

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="mt-1 block w-full"
                        value={data.password_confirmation}
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

                <div className="mt-4 gap-4 flex flex-col">
                    <p className="muted">
                        Already registered?{" "}
                        <Link href={route("login")} className="hover:underline">
                            Log in
                        </Link>
                    </p>

                    <Button disabled={processing}>Register</Button>
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
