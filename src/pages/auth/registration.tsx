import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

const registerForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type RegisterForm = z.infer<typeof registerForm>;

export function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterForm>();

  async function handleRegistration(data: RegisterForm) {
    console.log(data);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Restaurant successfully registred. 🎉", {
        action: {
          label: "Login",
          onClick: () => {
            navigate("/login");
          },
        },
      });
    } catch (error) {
      toast.error("Error registering your restaurant.");
    }
  }

  return (
    <>
      <Helmet title="Register" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/login">Login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Get started for Free
            </h1>
            <p className="text-muted-foreground text-sm">
              Become a partner and start tracking your sales!
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className="space-y-2">
              <Label htmlFor="restauranteName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Your Name</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Your Phonenumber</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finish Registration
            </Button>

            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              By continuing, you agree and accept our{" "}
              <a href="" className="underline underline-offset-4">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="" className="underline underline-offset-4">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
