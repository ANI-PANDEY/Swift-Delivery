"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Package, DollarSign, User, Truck } from "lucide-react"

const deliveryTypes = [
  { id: "standard", name: "Standard Delivery", time: "2-3 days", price: 150 },
  { id: "express", name: "Express Delivery", time: "1 day", price: 250 },
  { id: "same_day", name: "Same Day Delivery", time: "4-6 hours", price: 450 },
  { id: "urgent", name: "Urgent Delivery", time: "1-2 hours", price: 750 },
]

const packageSizes = [
  { id: "small", name: "Small (up to 2kg)", multiplier: 1 },
  { id: "medium", name: "Medium (2-10kg)", multiplier: 1.5 },
  { id: "large", name: "Large (10-25kg)", multiplier: 2 },
  { id: "extra_large", name: "Extra Large (25kg+)", multiplier: 3 },
]

export default function BookDeliveryPage() {
  const [formData, setFormData] = useState({
    // Sender details
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",

    // Recipient details
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientAddress: "",

    // Package details
    packageSize: "",
    packageWeight: "",
    packageDescription: "",
    packageValue: "",

    // Delivery details
    deliveryType: "",
    deliveryDate: "",
    deliveryTime: "",
    specialInstructions: "",

    // Options
    insurance: false,
    signature: false,
    fragile: false,
  })

  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const calculatePrice = () => {
    const deliveryType = deliveryTypes.find((d) => d.id === formData.deliveryType)
    const packageSize = packageSizes.find((p) => p.id === formData.packageSize)

    if (!deliveryType || !packageSize) return 0

    let price = deliveryType.price * packageSize.multiplier

    if (formData.insurance) price += 100
    if (formData.signature) price += 50
    if (formData.fragile) price += 80

    return Math.round(price)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Recalculate price when relevant fields change
    if (["deliveryType", "packageSize", "insurance", "signature", "fragile"].includes(field)) {
      setTimeout(() => {
        setEstimatedPrice(calculatePrice())
      }, 100)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock booking submission
    setTimeout(() => {
      const bookingId = "SW" + Math.random().toString(36).substr(2, 9).toUpperCase()
      toast({
        title: "Booking confirmed!",
        description: `Your booking ID is ${bookingId}. You'll receive a confirmation email shortly.`,
      })
      setIsLoading(false)
    }, 2000)
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Book a Delivery</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Fast, reliable, and secure delivery service</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Sender Details */}
                  <Card className="glass dark:glass-dark border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Sender Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="senderName">Full Name</Label>
                          <Input
                            id="senderName"
                            value={formData.senderName}
                            onChange={(e) => handleInputChange("senderName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="senderPhone">Phone Number</Label>
                          <Input
                            id="senderPhone"
                            type="tel"
                            value={formData.senderPhone}
                            onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="senderEmail">Email</Label>
                        <Input
                          id="senderEmail"
                          type="email"
                          value={formData.senderEmail}
                          onChange={(e) => handleInputChange("senderEmail", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="senderAddress">Pickup Address</Label>
                        <Textarea
                          id="senderAddress"
                          value={formData.senderAddress}
                          onChange={(e) => handleInputChange("senderAddress", e.target.value)}
                          placeholder="Enter complete pickup address"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recipient Details */}
                  <Card className="glass dark:glass-dark border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Recipient Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="recipientName">Full Name</Label>
                          <Input
                            id="recipientName"
                            value={formData.recipientName}
                            onChange={(e) => handleInputChange("recipientName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="recipientPhone">Phone Number</Label>
                          <Input
                            id="recipientPhone"
                            type="tel"
                            value={formData.recipientPhone}
                            onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="recipientEmail">Email (Optional)</Label>
                        <Input
                          id="recipientEmail"
                          type="email"
                          value={formData.recipientEmail}
                          onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="recipientAddress">Delivery Address</Label>
                        <Textarea
                          id="recipientAddress"
                          value={formData.recipientAddress}
                          onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                          placeholder="Enter complete delivery address"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Package Details */}
                  <Card className="glass dark:glass-dark border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Package Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="packageSize">Package Size</Label>
                          <Select
                            value={formData.packageSize}
                            onValueChange={(value) => handleInputChange("packageSize", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select package size" />
                            </SelectTrigger>
                            <SelectContent>
                              {packageSizes.map((size) => (
                                <SelectItem key={size.id} value={size.id}>
                                  {size.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="packageWeight">Weight (kg)</Label>
                          <Input
                            id="packageWeight"
                            type="number"
                            step="0.1"
                            value={formData.packageWeight}
                            onChange={(e) => handleInputChange("packageWeight", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="packageDescription">Package Description</Label>
                        <Textarea
                          id="packageDescription"
                          value={formData.packageDescription}
                          onChange={(e) => handleInputChange("packageDescription", e.target.value)}
                          placeholder="Describe the contents of your package"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="packageValue">Declared Value (₹)</Label>
                        <Input
                          id="packageValue"
                          type="number"
                          step="0.01"
                          value={formData.packageValue}
                          onChange={(e) => handleInputChange("packageValue", e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery Options */}
                  <Card className="glass dark:glass-dark border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Delivery Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="deliveryType">Delivery Type</Label>
                        <Select
                          value={formData.deliveryType}
                          onValueChange={(value) => handleInputChange("deliveryType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select delivery type" />
                          </SelectTrigger>
                          <SelectContent>
                            {deliveryTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                <div className="flex justify-between items-center w-full">
                                  <span>{type.name}</span>
                                  <span className="text-sm text-gray-500 ml-2">
                                    {type.time} - ₹{type.price}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="deliveryDate">Preferred Date</Label>
                          <Input
                            id="deliveryDate"
                            type="date"
                            value={formData.deliveryDate}
                            onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="deliveryTime">Preferred Time</Label>
                          <Select
                            value={formData.deliveryTime}
                            onValueChange={(value) => handleInputChange("deliveryTime", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                              <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                              <SelectItem value="anytime">Anytime</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="specialInstructions">Special Instructions</Label>
                        <Textarea
                          id="specialInstructions"
                          value={formData.specialInstructions}
                          onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                          placeholder="Any special delivery instructions..."
                        />
                      </div>

                      {/* Additional Options */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="insurance"
                            checked={formData.insurance}
                            onCheckedChange={(checked) => handleInputChange("insurance", checked)}
                          />
                          <Label htmlFor="insurance" className="text-sm">
                            Add insurance coverage (+₹100)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="signature"
                            checked={formData.signature}
                            onCheckedChange={(checked) => handleInputChange("signature", checked)}
                          />
                          <Label htmlFor="signature" className="text-sm">
                            Require signature on delivery (+₹50)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fragile"
                            checked={formData.fragile}
                            onCheckedChange={(checked) => handleInputChange("fragile", checked)}
                          />
                          <Label htmlFor="fragile" className="text-sm">
                            Fragile handling (+₹80)
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Price Summary */}
                <div className="lg:col-span-1">
                  <Card className="glass dark:glass-dark border-0 sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Price Estimate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {estimatedPrice > 0 ? (
                        <div className="space-y-3">
                          <div className="text-3xl font-bold text-green-600">₹{estimatedPrice}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {formData.deliveryType && (
                              <div className="flex justify-between">
                                <span>Base price:</span>
                                <span>₹{deliveryTypes.find((d) => d.id === formData.deliveryType)?.price}</span>
                              </div>
                            )}
                            {formData.packageSize && (
                              <div className="flex justify-between">
                                <span>Size multiplier:</span>
                                <span>×{packageSizes.find((p) => p.id === formData.packageSize)?.multiplier}</span>
                              </div>
                            )}
                            {formData.insurance && (
                              <div className="flex justify-between">
                                <span>Insurance:</span>
                                <span>+₹100</span>
                              </div>
                            )}
                            {formData.signature && (
                              <div className="flex justify-between">
                                <span>Signature:</span>
                                <span>+₹50</span>
                              </div>
                            )}
                            {formData.fragile && (
                              <div className="flex justify-between">
                                <span>Fragile handling:</span>
                                <span>+₹80</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Select delivery options to see price estimate</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isLoading || estimatedPrice === 0}
                      >
                        {isLoading ? "Booking..." : `Book Delivery - ₹${estimatedPrice}`}
                      </Button>

                      <div className="text-xs text-gray-500 text-center">
                        Final price may vary based on actual package dimensions and delivery location
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
