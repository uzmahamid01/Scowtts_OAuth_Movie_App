import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome to</h1>

          <h2 className="text-3xl font-semibold text-slate-700">Scowt Take Home Assignment</h2>

          <p className="text-slate-600 text-lg leading-relaxed">
            Ready to showcase your skills? Let's get started with this exciting challenge.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/login">
            <Button
              size="lg"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="text-sm text-slate-500">Click above to begin your journey</div>
      </div>
    </div>
  )
}
