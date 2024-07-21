"use client";

import { Input } from "@/components/ui/input";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { z } from "zod"


export default function GetAlbum() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

  const [accessToken, setAccessToken] = useState()
  const [loading, setLoading] = useState(false)

  // VALIDATE FORM
  const albumFormSchema = z.object({
    album_name: z.string().max(50, {
      message: 'Enter a valid album name'
    }),
  })

  const form = useForm<z.infer<typeof albumFormSchema>>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      album_name: "",
    },
  })


  // GET ACCESS TOKEN
  useEffect(() => {
    let authParams = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      body:
        `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then(result => result.json())
      .then(data => {
        setAccessToken(data.access_token);
      });
  }, [clientId, clientSecret]);


  // GET ALBUM, USING ACCESS TOKEN
  const search = async (album: z.infer<typeof albumFormSchema>) => {
    setLoading(true);
    try {
      let albumParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(`https://api.spotify.com/v1/search?q=${album.album_name}`&typep);
      const data = await response.json();
      setLoading(false);
      // console.log(data);
      console.log(data)
      console.log(data.albums.items)
      form.reset()
    } catch (error) {
      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(search)}
            className="w-2/3 space-y-6"
          >
            <FormField
              //   control={form}
              name="album_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Get Album</FormLabel>
                  <FormControl>
                    <Input placeholder="Search for an Artist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"lg"}
            // className="text-black-400 hover:no-underline px-5 py-5 bg-transparent text-white"
            >
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Searching
                </>
              ) : (
                'Search'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div >
  );
}
