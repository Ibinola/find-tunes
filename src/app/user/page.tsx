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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import { z } from "zod"


export default function GetAlbum() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

  const [accessToken, setAccessToken] = useState()
  const [loading, setLoading] = useState(false)
  const [albums, setAlbums] = useState([])

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


  // GET ARTIST, USING ACCESS TOKEN
  const search = async (album: z.infer<typeof albumFormSchema>) => {
    setLoading(true);
    try {
      let artistParams = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(`https://api.spotify.com/v1/search?q=${album.album_name}&type=artist`, artistParams);
      const artistData = await response.json();
      // setAlbums(data.artists.items[0].id);
      const artistId = artistData.artists.items[0].id
      console.log(album.album_name)
      console.log(artistId)

      const responseAlbum = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`, artistParams)
      const albumData = await responseAlbum.json();
      const albumArray = albumData.items
      setAlbums(albumArray)
      console.log(albumArray)
      setLoading(false);
      form.reset()
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
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
                  'Search'
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {albums.map((album, index) => (
            <>
              <Card key={index} className="w-full bg-gray-800 text-white p-4">
                <CardHeader>
                  {album.name}
                </CardHeader>
              </Card>


              <Card>
                {/* <img src={album.images[0]} alt="" /> */}
              </Card>
            </>
          ))}
        </div>
      </div>
    </div>

  );
}
