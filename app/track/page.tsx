"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Search, MapPin, Truck, Package, Clock, CheckCircle, AlertCircle, Phone } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Mock tracking data
const mockTrackingData = {
  SW123456789: {
    id: "SW123456789",
    status: "in_transit",
    statusText: "In Transit",
    estimatedDelivery: "2024-01-15 14:30",
    sender: {
      name: "Rajesh Kumar",
      address: "45 Karol Bagh, New Delhi, Delhi 110005, India",
    },
    recipient: {
      name: "Priya Sharma",
      address: "78 Lajpat Nagar, New Delhi, Delhi 110024, India",
      phone: "+91 6203130623",
    },
    timeline: [
      {
        status: "picked_up",
        title: "Package Picked Up",
        description: "Package collected from sender",
        timestamp: "2024-01-14 09:15",
        location: "Karol Bagh, New Delhi",
        completed: true,
      },
      {
        status: "in_transit",
        title: "In Transit",
        description: "Package is on the way to destination",
        timestamp: "2024-01-14 12:30",
        location: "Processing Center, Delhi",
        completed: true,
      },
      {
        status: "out_for_delivery",
        title: "Out for Delivery",
        description: "Package is out for delivery",
        timestamp: "2024-01-15 08:00",
        location: "Lajpat Nagar, Delhi",
        completed: false,
      },
      {
        status: "delivered",
        title: "Delivered",
        description: "Package delivered successfully",
        timestamp: "2024-01-15 14:30",
        location: "Lajpat Nagar, Delhi",
        completed: false,
      },
    ],
  },
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setTrackingId(id)
      handleTrack(id)
    }
  }, [searchParams])

  const handleTrack = async (id?: string) => {
    const idToTrack = id || trackingId
    if (!idToTrack) return

    setIsLoading(true)
    setError("")

    // Mock API call
    setTimeout(() => {
      const data = mockTrackingData[idToTrack as keyof typeof mockTrackingData]
      if (data) {
        setTrackingData(data)
      } else {
        setError("Tracking ID not found. Please check and try again.")
        setTrackingData(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "picked_up":
        return "bg-blue-500"
      case "in_transit":
        return "bg-yellow-500"
      case "out_for_delivery":
        return "bg-orange-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "picked_up":
        return Package
      case "in_transit":
        return Truck
      case "out_for_delivery":
        return MapPin
      case "delivered":
        return CheckCircle
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Track Your Package</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Enter your tracking ID to get real-time updates
              </p>
            </div>

            {/* Search */}
            <Card className="glass dark:glass-dark border-0">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter tracking ID (e.g., SW123456789)"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                    />
                  </div>
                  <Button
                    onClick={() => handleTrack()}
                    disabled={isLoading || !trackingId}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? "Tracking..." : "Track"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Tracking Results */}
            {trackingData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Status Overview */}
                <Card className="glass dark:glass-dark border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Package #{trackingData.id}</CardTitle>
                        <CardDescription>
                          Estimated delivery: {new Date(trackingData.estimatedDelivery).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(trackingData.status)} text-white`}>
                        {trackingData.statusText}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">From</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {trackingData.sender.name}
                          <br />
                          {trackingData.sender.address}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">To</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {trackingData.recipient.name}
                          <br />
                          {trackingData.recipient.address}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {trackingData.recipient.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="glass dark:glass-dark border-0">
                  <CardHeader>
                    <CardTitle>Live Tracking Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Interactive map integration would be here
                          <br />
                          (Mapbox/Google Maps)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="glass dark:glass-dark border-0">
                  <CardHeader>
                    <CardTitle>Tracking Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.timeline.map((event: any, index: number) => {
                        const Icon = getStatusIcon(event.status)
                        return (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`
                                w-10 h-10 rounded-full flex items-center justify-center
                                ${
                                  event.completed
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                }
                              `}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              {index < trackingData.timeline.length - 1 && (
                                <div
                                  className={`
                                  w-0.5 h-8 mt-2
                                  ${event.completed ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}
                                `}
                                />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center justify-between mb-1">
                                <h4
                                  className={`font-semibold ${
                                    event.completed
                                      ? "text-gray-900 dark:text-white"
                                      : "text-gray-500 dark:text-gray-400"
                                  }`}
                                >
                                  {event.title}
                                </h4>
                                <span className="text-sm text-gray-500">
                                  {new Date(event.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{event.description}</p>
                              <p className="text-xs text-gray-500">{event.location}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
