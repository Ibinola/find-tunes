"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { z } from "zod";
import { albumType } from "@/lib/utils";
import Link from "next/link";

export default function GetAlbum() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState();
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);

  // VALIDATE FORM
  const albumFormSchema = z.object({
    album_name: z.string().max(50, {
      message: "Enter a valid album name",
    }),
  });

  const form = useForm<z.infer<typeof albumFormSchema>>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      album_name: "",
    },
  });

  // GET ACCESS TOKEN
  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const authParams = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        };

        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authParams
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data.access_token);
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Failed to fetch access token", error);
      }
    };

    if (clientId && clientSecret) {
      getAuthToken();
    }
  }, [clientId, clientSecret]);

  // GET ARTIST, USING ACCESS TOKEN
  const search = async (album: z.infer<typeof albumFormSchema>) => {
    setLoading(true);
    try {
      let artistParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${album.album_name}&type=artist`,
        artistParams
      );
      const artistData = await response.json();
      const artistId = artistData.artists.items[0].id;

      const responseAlbum = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`,
        artistParams
      );
      const albumData = await responseAlbum.json();
      const albumArray = albumData.items;
      setAlbums(albumArray);
      setLoading(false);
      form.reset();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-lg p-8 space-y-8">
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(search)} className="space-y-6">
              <FormField
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
              <Button type="submit" size="lg">
                {loading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {loading
            ? Array(10)
                .fill(null)
                .map((_, index) => (
                  <Card
                    key={index}
                    className="w-[400px] bg-gray-800 text-white p-4 text-center"
                  >
                    <Skeleton className="w-48 h-48 mx-auto mb-4" />
                    <Skeleton className="w-32 h-4 mx-auto mb-2" />
                    <Skeleton className="w-48 h-4 mx-auto" />
                  </Card>
                ))
            : albums.map((album: albumType) => (
                <Card
                  key={album.id}
                  className="w-[400px] bg-gray-800 text-white p-4 text-center"
                >
                  {loading ? (
                    <Card>
                      <Skeleton className="h-[200px] w-[200px] rounded-xl" />
                    </Card>
                  ) : (
                    <Image
                      src={album.images[0]?.url}
                      className="mx-auto"
                      alt="album-image"
                      width={200}
                      height={200}
                    />
                  )}
                  <CardContent>
                    <p className="mt-3">{album.name}</p>
                    <p>Release Date: {album.release_date}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="text-black-400 hover:no-underline px-5 py-5 bg-transparent mt-4"
                    >
                      <Link href={album.external_urls.spotify} target="_blank">
                        Album Link
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
