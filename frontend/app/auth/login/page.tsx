"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import api from "@/lib/axios";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export default function LoginForm() {
  const { login } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const response = await api.post("/api/login", data);
      const token = response.data.token;
      login(token);
      router.push("/");
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Login Failed!";
      alert(message);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-screen flex-col items-center justify-center px-6">
      <Card className="w-full max-w-5xl px-2">
        <div className="flex h-full flex-col md:flex-row">
          {/* Left Side Image */}
          <div
            className="hidden w-1/2 bg-contain bg-center bg-no-repeat md:block"
            style={{ backgroundImage: "url('/image2.png')" }}
          />

          {/* Right Side Form */}
          <div className="flex w-full flex-col justify-center gap-4 p-8 md:w-1/2">
            <CardHeader>
              <CardTitle className="text-xl">Log In</CardTitle>
              <CardDescription>
                Enter your details below to Log In to an existing account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email Id</FieldLabel>
                        <Input
                          {...field}
                          id="login-form-email"
                          aria-invalid={fieldState.invalid}
                          type="email"
                          placeholder="abc@xyz.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                          {...field}
                          id="login-form-password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Password"
                          type="password"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation={"horizontal"}>
                <Button form="login-form" className="hover:cursor-pointer">
                  Log In
                </Button>
                <Link href="/auth/signup">
                  <Button
                    className="font-semibold hover:cursor-pointer"
                    variant={"outline"}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Field>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
