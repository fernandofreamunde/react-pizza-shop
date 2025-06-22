import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";

const loginForm = z.object({
  email: z.string().email(),
});

type LoginForm = z.infer<typeof loginForm>;

export function Login() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: login,
  });

  async function handleLogin(data: LoginForm) {
    console.log(data);

    try {
      await authenticate({ email: data.email });
      toast.success("We have sent you a magic link 🪄 to your email.", {
        action: {
          label: "Re Send",
          onClick: () => {
            handleLogin(data);
          },
        },
      });
    } catch (error) {
      toast.error("Invalid credentials");
      // just something to conflict with
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/register">Register</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Panel
            </h1>
            <p className="text-muted-foreground text-sm">
              Track your sales with the partner panel
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-2">
              <Label htmlFor="email">Your e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Access Panel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
