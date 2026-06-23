"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <Surface className="w-full max-w-md p-8 rounded-3xl border border-gray-800 bg-[#0f111a] shadow-2xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full space-y-4">
            <Fieldset.Legend className="text-2xl font-bold text-center text-white">
              Sign In
            </Fieldset.Legend>

            <Description className="text-center text-gray-400">
              Welcome back to ArtHub
            </Description>

            <TextField isRequired name="email" type="email">
              <Label className="text-white">Email</Label>
              <Input
                placeholder="john@example.com"
                variant="secondary"
                className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
              />
              <FieldError />
            </TextField>

            <TextField isRequired name="password" type="password">
              <Label className="text-white">Password</Label>
              <Input
                placeholder="********"
                variant="secondary"
                className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
              />
              <FieldError />
            </TextField>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold"
            >
              Sign In
            </Button>
          </Fieldset>
        </Form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-800"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-800"></div>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="w-full py-6 flex items-center gap-2 bg-white text-black font-bold hover:bg-gray-200"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-pink-500 hover:underline"
          >
            Registe
          </a>
        </p>
      </Surface>
    </div>
  );
}