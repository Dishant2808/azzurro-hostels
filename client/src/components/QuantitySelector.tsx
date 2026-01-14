import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface QuantitySelectorProps {
  children: React.ReactNode
  label: string
  initialValue?: number
  maxValue: number
  minValue?: number
  guestMaxValue?: number
  isPrivate: boolean
  onConfirm: (value: number, guests: number) => void
  className?: string
}

export function QuantitySelector({
  children,
  label,
  initialValue = 1,
  maxValue,
  minValue = 1,
  guestMaxValue = 1,
  isPrivate,
  onConfirm,
  className
}: QuantitySelectorProps) {
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(maxValue > 0? initialValue: 0)
  const [guestQuantity, setGuestQuantity] = useState(guestMaxValue)

  const { toast } = useToast();

  const handleIncrement = () => {
    if (quantity < maxValue) {
      setQuantity(quantity + 1)
    } else {

      toast({
        title: `Sorry! No more ${label} available`,
        description: `Your current selection only has ${maxValue} quantity available.`,
        duration: 3000,
      });
    }
  }

  const handleDecrement = () => {
    if (quantity > minValue) {
      setQuantity(quantity - 1)
    }
  }

  const handleGuestDecrement = () => {
    if (guestQuantity > minValue) {
      setGuestQuantity(guestQuantity - 1)
    }
  }

  const handleGuestIncrement = () => {
    if (guestQuantity < guestMaxValue) {
      setGuestQuantity(guestQuantity + 1)
    }
  }

  const handleConfirm = () => {
    if (quantity > 0 && quantity <= maxValue) onConfirm(quantity, guestQuantity)
    setOpen(false)
  }

  const handleCancel = () => {
    setQuantity(maxValue > 0? initialValue: 0)
    setGuestQuantity(guestMaxValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className={cn("w-80 p-6", className)} 
        align="center"
        sideOffset={8}
      >
        <div className="space-y-6">
          
          {/* Header with label and quantity selector */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {label}
            </h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={quantity <= minValue}
                className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                data-testid="button-decrement"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span 
                className="text-xl font-semibold min-w-[2rem] text-center text-gray-900 dark:text-white"
                data-testid="text-quantity"
              >
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={quantity > maxValue}
                className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                data-testid="button-increment"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Max value indicator */}
          <div className={`${maxValue>3 ? 'hidden':''} text-right`}>
            <span className="text-sm text-red-400 dark:text-red-400">
              Max available: {maxValue}
            </span>
          </div>
          <hr></hr>
          {isPrivate && <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Adults
              </h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleGuestDecrement}
                  disabled={guestQuantity <= minValue}
                  className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  data-testid="button-decrement"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span 
                  className="text-xl font-semibold min-w-[2rem] text-center text-gray-900 dark:text-white"
                  data-testid="text-quantity"
                >
                  {guestQuantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleGuestIncrement}
                  disabled={guestQuantity >= guestMaxValue}
                  className="h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  data-testid="button-increment"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Max value indicator */}
            <div className="text-right">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Max Guests: {guestMaxValue}
              </span>
            </div>
          </div>}

          {/* Action buttons */}
          <div className="flex justify-between space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white border-0"
              data-testid="button-confirm"
            >
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}