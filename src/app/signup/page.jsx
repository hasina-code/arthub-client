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
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const result = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        role: user.role,
        plan: "free",
      });

      if (result?.error) {
        setError(result.error.message);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-20">
      <Surface className="w-full max-w-md p-8 rounded-3xl border border-gray-800 bg-[#0f111a] shadow-2xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-4xl font-bold text-center text-white">
              Create Account
            </Fieldset.Legend>

            <Description className="text-center text-gray-400 mb-2">
              Create your ArtHub account
            </Description>

            <Fieldset.Group className="space-y-4">
              <TextField isRequired name="name">
                <Label className="text-white">Full Name</Label>
                <Input
                  placeholder="John Doe"
                  variant="secondary"
                  className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
                />
                <FieldError />
              </TextField>

              <TextField name="image" type="url">
                <Label className="text-white">Image URL</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  variant="secondary"
                  className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
                />
                <FieldError />
              </TextField>

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

              <TextField
                isRequired
                name="confirmPassword"
                type="password"
              >
                <Label className="text-white">
                  Confirm Password
                </Label>
                <Input
                  placeholder="********"
                  variant="secondary"
                  className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700"
                />
                <FieldError />
              </TextField>

              <Select
                isRequired
                name="role"
                placeholder="Select your role"
              >
                <Label className="text-white">Signup As</Label>

                <Select.Trigger className="w-full p-3 mb-4 rounded-xl bg-slate-950 text-white border border-slate-700">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="buyer" textValue="buyer">
                      Buyer
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="artist" textValue="artist">
                      Artist
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </Fieldset.Group>

            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold mt-4"
            >
              Sign Up
            </Button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-800"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="h-px flex-1 bg-gray-800"></div>
            </div>

            <Button
              onClick={handleGoogleSignUp}
              className="w-full py-6 flex items-center gap-2 bg-white text-black font-bold hover:bg-gray-200"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-pink-500 hover:underline"
              >
                Sign 
              </a>
            </p>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}