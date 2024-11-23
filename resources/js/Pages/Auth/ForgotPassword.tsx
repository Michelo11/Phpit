import InputError from "@/Components/InputError";
import { Button } from "@/Components/Ui/Button";
import { Input } from "@/Components/Ui/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 muted">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-success">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
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

                <Button className="mt-4 w-full" disabled={processing}>
                    Email Password Reset Link
                </Button>
            </form>
        </GuestLayout>
    );
}
