import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  getManagedRestaurant,
  type GetManagedRestaurantResponse,
} from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: restaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
    },
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    // Note: if we want the ui to change only on sucess use following
    //       because the nature of this particular mutation, we are
    //       setting it as an optimist mutation (we assume it succedes)
    //
    //       since 99,9% of the times it will work. the new code covers
    //       the failure and reverts changes if the request fails.
    //
    //       for the previous diff look for commit 'make optimist interface'
    //
    // onSuccess(_, { description, name }) {
    //   const cashed = queryClient.getQueryData<GetManagedRestaurantResponse>([
    //     "managed-restaurant",
    //   ]);
    //
    //   if (cashed) {
    //     queryClient.setQueryData<GetManagedRestaurantResponse>(
    //       ["managed-restaurant"],
    //       { ...cashed, name, description },
    //     );
    //   }
    // },
    onMutate({ description, name }) {
      const { cashed } = updateManagedRestaurantCache({ description, name });
      return { previousProfile: cashed };
    },
    onError(_error, _variables, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile);
      }
    },
  });

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cashed = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cashed) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        { ...cashed, name, description },
      );
    }

    return { cashed };
  }

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success("Profile updated successfuly! ✅");
    } catch {
      toast.error("Profile failed to update! Please try again. ⚠️");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Shop Profile</DialogTitle>
        <DialogDescription>
          Update your business information visible to your customers
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </DialogClose>

          <Button variant="success" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
