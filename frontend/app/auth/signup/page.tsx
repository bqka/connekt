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
import api from "@/lib/axios";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export default function SignupForm() {

  const { login } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    }
  });

  async function onSubmit(data: z.infer<typeof signupSchema>) {
    try {
      await api.post("/api/signup", data);
      const response = await api.post("/api/login", {
        email: data.email,
        password: data.password
      })
      const token = response.data.token;
      login(token);
      alert("User Registered Successfully!");
      router.push("/");
      
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Signup Failed!";
      alert(message);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-screen flex-col items-center justify-center px-6">
      <Card className="w-full max-w-5xl px-2">
        <div className="flex h-full flex-col md:flex-row">
          {/* Left Side */}
          <div
            className="hidden w-1/2 bg-contain bg-center bg-no-repeat md:block"
            style={{ backgroundImage: "url('/image2.png')" }}
          />

          {/* Right Side */}
          <div className="flex w-full flex-col justify-center gap-4 p-8 md:w-1/2">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your details below to create a new Account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Username</FieldLabel>
                        <Input
                          {...field}
                          id="s-form-username"
                          aria-invalid={fieldState.invalid}
                          type="text"
                          placeholder="John Doe"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email Id</FieldLabel>
                        <Input
                          {...field}
                          id="signup-form-email"
                          aria-invalid={fieldState.invalid}
                          type="email"
                          placeholder="abc@xyz.com"
                          autoComplete="off"
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
                          id="s-form-password"
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
                <Button
                  form="signup-form"
                  className="font-semibold hover:cursor-pointer"
                >
                  Register
                </Button>
              </Field>
            </CardFooter>
          </div>

        </div>
      </Card>
    </div>
  );
}
