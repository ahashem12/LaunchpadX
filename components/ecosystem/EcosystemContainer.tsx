"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export interface EcosystemItem {
  id: number
  title: string
  description: string
  banner_url?: string
  logo?: string
  badge: string
  badgeColor?: string
  category?: string
  location?: string
  buttonText?: string
  buttonVariant?: "default" | "outline"
  url?: string
}

interface EcosystemContainerProps {
  title: string
  subtitle: string
  items: EcosystemItem[]
  defaultIcon?: React.ReactNode
}

export function EcosystemContainer({
  title,
  subtitle,
  items,
  defaultIcon
}: EcosystemContainerProps) {
  const getBadgeColor = (item: EcosystemItem) => {
    if (item.badgeColor) return item.badgeColor
    return "bg-watermelon-green text-white"
  }

  const isExternalUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  const BannerImage = ({ item }: { item: EcosystemItem }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    if (!item.banner_url || imageError) {
      // Fallback to logo/icon block
      return (
        <div className="flex justify-center p-6">
          <div className="w-16 h-16 flex items-center justify-center">
            {item.logo ? (
              <Image
                src={item.logo}
                alt={`${item.title} logo`}
                width={64}
                height={64}
                className="object-contain max-w-full max-h-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-watermelon-green to-watermelon-red rounded-lg flex items-center justify-center">
                {defaultIcon}
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <Image
          src={item.banner_url}
          alt={item.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    )
  }

  const ActionButton = ({ item }: { item: EcosystemItem }) => {
    const buttonContent = (
      <Button 
        className={`w-full font-medium rounded-lg ${
          item.buttonVariant === "outline" 
            ? "border-watermelon-green text-watermelon-green hover:bg-watermelon-green hover:text-white" 
            : "bg-watermelon-green hover:bg-watermelon-green/90 text-white"
        }`}
        variant={item.buttonVariant || "default"}
      >
        {item.buttonText || "Learn More"}
      </Button>
    )

    if (!item.url) {
      return buttonContent
    }

    if (isExternalUrl(item.url)) {
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {buttonContent}
        </a>
      )
    }

    return (
      <Link href={item.url} className="block">
        {buttonContent}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card 
              key={item.id} 
              className="bg-card border-border hover:shadow-lg transition-all duration-300 group h-full flex flex-col overflow-hidden"
            >
              {/* Banner Image or Logo Section */}
              <BannerImage item={item} />

              <CardContent className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <div className="text-left mb-3">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-watermelon-green transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {(item.location || item.category) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.location || item.category}
                    </p>
                  )}
                </div>

                {/* Badge */}
                <div className="mb-4">
                  <Badge className={`${getBadgeColor(item)} rounded-full px-3 py-1 text-xs font-medium`}>
                    {item.badge}
                  </Badge>
                </div>

                {/* Description */}
                <div className="flex-grow mb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 text-left">
                    {item.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <ActionButton item={item} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
