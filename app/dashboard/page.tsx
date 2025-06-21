"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Package, Truck, Clock, CheckCircle, Plus, Eye, BarChart3, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data
const mockShipments = [
  {
    id: "SW123456789",
    recipient: "Priya Sharma",
    address: "78 Lajpat Nagar, New Delhi, Delhi",
    status: "in_transit",
    statusText: "In Transit",
    date: "2024-01-14",
    amount: 250.0,
  },
  {
    id: "SW987654321",
    recipient: "Amit Singh",
    address: "156 Rohini, New Delhi, Delhi",
    status: "delivered",
    statusText: "Delivered",
    date: "2024-01-13",
    amount: 150.0,
  },
  {
    id: "SW456789123",
    recipient: "Sunita Gupta",
    address: "89 Dwarka, New Delhi, Delhi",
    status: "picked_up",
    statusText: "Picked Up",
    date: "2024-01-15",
    amount: 450.0,
  },
]

const stats = [
  { title: "Total Shipments", value: "24", icon: Package, color: "text-blue-600" },
  { title: "In Transit", value: "8", icon: Truck, color: "text-yellow-600" },
  { title: "Delivered", value: "15", icon: CheckCircle, color: "text-green-600" },
  { title: "Pending", value: "1", icon: Clock, color: "text-orange-600" },
]

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("auth-token")
    const email = localStorage.getItem("user-email")

    if (!token) {
      window.location.href = "/login"
      return
    }

    setUserEmail(email || "user@example.com")
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {userEmail}</p>
              </div>
              <Button
                className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/book">
                  <Plus className="h-4 w-4 mr-2" />
                  New Shipment
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="glass dark:glass-dark border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <Tabs defaultValue="shipments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipments">My Shipments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="shipments" className="space-y-6">
                <Card className="glass dark:glass-dark border-0">
                  <CardHeader>
                    <CardTitle>Recent Shipments</CardTitle>
                    <CardDescription>Track and manage your recent deliveries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockShipments.map((shipment) => (
                        <div
                          key={shipment.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <Package className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{shipment.id}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">To: {shipment.recipient}</p>
                              <p className="text-xs text-gray-500">{shipment.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <Badge className={`${getStatusColor(shipment.status)} text-white`}>
                                {shipment.statusText}
                              </Badge>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                ₹{shipment.amount.toFixed(2)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/track?id=${shipment.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Track
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass dark:glass-dark border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Monthly Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                          <p className="text-gray-600 dark:text-gray-400">Analytics charts would be here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass dark:glass-dark border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Spending Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">This Month</span>
                          <span className="font-semibold">₹2,450.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                          <span className="font-semibold">₹1,895.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Average per Shipment</span>
                          <span className="font-semibold">₹285.00</span>
                        </div>
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Spent</span>
                            <span className="text-xl font-bold text-green-600">₹12,345.00</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card className="glass dark:glass-dark border-0">
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your account information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-4">Account Information</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                              <p className="text-gray-900 dark:text-white">{userEmail}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Member Since
                              </label>
                              <p className="text-gray-900 dark:text-white">January 2024</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Account Type
                              </label>
                              <p className="text-gray-900 dark:text-white">Standard</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-4">Preferences</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Email Notifications
                              </label>
                              <p className="text-gray-900 dark:text-white">Enabled</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                SMS Notifications
                              </label>
                              <p className="text-gray-900 dark:text-white">Enabled</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Default Delivery Type
                              </label>
                              <p className="text-gray-900 dark:text-white">Express</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Update Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
