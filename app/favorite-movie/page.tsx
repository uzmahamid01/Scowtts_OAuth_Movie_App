"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
  import { getSession } from "next-auth/react";


export default function FavoriteMoviePage() {
  const { data: session, status } = useSession()
  const [movie, setMovie] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.replace("/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) return null 


async function saveMovie() {
  await fetch("/api/favorite-movie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favoriteMovie: movie }),
  });

  let tries = 5;
  while (tries > 0) {
    const session = await getSession();
    if (session?.user?.favoriteMovie === movie) break;
    await new Promise((res) => setTimeout(res, 500));
    tries--;
  }

  router.replace("/dashboard");
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">What's your favorite movie?</CardTitle>
          <CardDescription>Tell us about your favorite movie to get personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="movie">Movie Name</Label>
            <Input
              id="movie"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              placeholder="Enter your favorite movie"
              className="w-full"
            />
          </div>
          <Button onClick={saveMovie} disabled={!movie.trim()} className="w-full" size="lg">
            Save & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
