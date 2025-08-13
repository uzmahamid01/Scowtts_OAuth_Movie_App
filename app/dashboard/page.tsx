"use client"

import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, LogOut, Film } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [favoriteMovie, setFavoriteMovie] = useState("")
  const [fact, setFact] = useState("")
  const [loadingFact, setLoadingFact] = useState(false)
  const [errorFact, setErrorFact] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.favoriteMovie) {
      setFavoriteMovie(session.user.favoriteMovie)
    }
  }, [session])

  useEffect(() => {
    async function fetchFact() {
      if (!favoriteMovie) return

      setLoadingFact(true)
      setErrorFact("")
      setFact("")

      try {
        const res = await fetch("/api/movie-fact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieName: favoriteMovie }),
        })

        if (!res.ok) {
          throw new Error("Failed to fetch fact.")
        }

        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setFact(data.fact)
      } catch (err) {
        if (err instanceof Error) {
          setErrorFact(err.message)
        } else {
          setErrorFact("Error fetching fact.")
        }
      } finally {
        setLoadingFact(false)
      }
    }

    fetchFact()
  }, [favoriteMovie])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    router.replace("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={session.user?.image || "/default.png"} alt="User" />
                <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl">{session.user?.name}</div>
                <div className="text-sm text-muted-foreground">{session.user?.email}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Favorite Movie:</span>
              <Badge variant="secondary">{favoriteMovie}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Movie Fact Card */}
        {favoriteMovie && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5" />
                Fun Fact about {favoriteMovie}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingFact && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading fun fact...
                </div>
              )}

              {errorFact && (
                <Alert variant="destructive">
                  <AlertDescription>{errorFact}</AlertDescription>
                </Alert>
              )}

              {!loadingFact && !errorFact && fact && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">{fact}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
