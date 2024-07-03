"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export default function GetAlbum() {
  //   const formSchema = z.object({
  //     username: z.string().min(2, {
  //       message: "Username must be at least 2 characters.",
  //     }),
  //   });
  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      username: "",
    },
  });

  function handleLookUp(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLookUp)}
            className="w-2/3 space-y-6"
          >
            <FormField
              //   control={form}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Get Album</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter an Album Name" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              //   className="text-black-400 hover:no-underline px-5 py-5 bg-transparent text-white"
            >
              Get Album
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
