import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Platform {
  id: string
  name: string
  description: string
  url: string
  logo: string
}

export function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative space-y-4">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Image
            src={platform.logo}
            alt={`${platform.name} logo`}
            className="h-12 w-20 rounded-lg bg-transaprent object-fit"
            width={2420}
            height={1220}
          />
        </div>

        {/* Platform Name */}
        <h3 className="text-center text-2xl font-bold text-foreground">{platform.name}</h3>

        {/* Description */}
        <p className="text-center text-sm text-muted-foreground leading-relaxed">{platform.description}</p>

        {/* CTA Link */}
        <div className="flex justify-center pt-4">
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2 font-semibold text-accent-foreground transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-accent/30"
          >
            Go to Website
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </div>
  )
}
