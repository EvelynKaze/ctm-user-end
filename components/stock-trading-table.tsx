"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react"
import { fetchStocks, ExchangeType } from "@/app/actions/fetch-stocks"
import { Stock, Pagination } from "@/types/stock"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface StockQuantity {
  [symbol: string]: number
}

interface CachedPage {
  [key: string]: {
    stocks: Stock[]
    pagination: Pagination
    timestamp: number
  }
}

export function StockTradingTable() {
  const [quantities, setQuantities] = useState<StockQuantity>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [stocks, setStocks] = useState<Stock[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [cache, setCache] = useState<CachedPage>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExchange, setSelectedExchange] = useState<ExchangeType>("nasdaq")

  // Cache duration: 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000

  // Create cache key for exchange, page and search query
  const getCacheKey = (exchange: ExchangeType, page: number, search: string) => {
    const baseKey = `${exchange}_page_${page}`
    return search ? `${exchange}_search_${search}_page_${page}` : baseKey
  }

  const loadStocks = useCallback(async (exchange: ExchangeType, page: number, search: string = "") => {
    const cacheKey = getCacheKey(exchange, page, search)
    
    // Check cache first
    const cached = cache[cacheKey]
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setStocks(cached.stocks)
      setPagination(cached.pagination)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      // Use the API's built-in search functionality
      const response = await fetchStocks(exchange, page, search)

      if (response && response.success) {
        setStocks(response.data)
        setPagination(response.pagination)
        
        // Cache the results
        setCache(prev => ({
          ...prev,
          [cacheKey]: {
            stocks: response.data,
            pagination: response.pagination,
            timestamp: Date.now()
          }
        }))
      }
    } catch (error) {
      console.error("Failed to load stocks:", error)
    } finally {
      setLoading(false)
    }
  }, [cache, CACHE_DURATION])

  useEffect(() => {
    loadStocks(selectedExchange, currentPage, searchQuery)
  }, [currentPage, searchQuery, selectedExchange, loadStocks])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleExchangeChange = (exchange: ExchangeType) => {
    setSelectedExchange(exchange)
    setCurrentPage(1) // Reset to first page when changing exchange
    setSearchQuery("") // Clear search when changing exchange
  }

  const updateQuantity = (symbol: string, newQuantity: number) => {
    if (newQuantity < 0) return
    setQuantities((prev) => ({
      ...prev,
      [symbol]: newQuantity,
    }))
  }

  const handleBuy = (symbol: string, quantity: number, price: number) => {
    const total = (quantity * price).toFixed(2)
    alert(`Order placed!\n\nStock: ${symbol}\nQuantity: ${quantity}\nPrice per share: $${price}\nTotal: $${total}`)
    // Reset quantity after purchase
    setQuantities((prev) => ({
      ...prev,
      [symbol]: 0,
    }))
  }

  const goToPage = (page: number) => {
    if (!pagination) return
    const newPage = Math.max(1, Math.min(page, pagination.totalPages))
    setCurrentPage(newPage)
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatChange = (change: number, percentage: number) => {
    const isPositive = change >= 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span className="font-medium">
          {isPositive ? "+" : ""}
          {change.toFixed(2)} ({isPositive ? "+" : ""}
          {percentage.toFixed(2)}%)
        </span>
      </div>
    )
  }

//    const handlePurchase = (stock: Stock) => {
//       const quantity = quantities[stock.id] || 0;
//       const total = quantity * stock.price;
//       const total_investment = portfolio?.total_investment ?? 0;
//       try {
//         if (quantity > 0 && total_investment < total) {
//           const difference = total - total_investment;
//           dispatch(
//             setStockOption({
//               name: stock.name,
//               symbol: stock.symbol,
//               price: stock.price,
//               change: stock.change,
//               isMinus: stock.isMinus,
//               quantity,
//               total: difference,
//             })
//           );
  
//           toast("Purchase initiated!", {
//             description: `Deposit $${total.toFixed(2)} to complete the transaction.`,
//           });
  
//           router.push("/dashboard/deposit");
//         } else{
//           setSelectedStock(stock)
//           setShowAlertDialog(true)
//         }
//       } catch (err) {
//         const error = err as Error;
//         console.error("Error in handlePurchase:", error);
//       }
//     };
  
//     const handleStockModalPurchase = async () => {
//       if (!selectedStock) return; // Ensure selectedStock is not null before proceeding
  
//       const quantity = quantities[selectedStock.id] || 0;
//       const total = quantity * (selectedStock.price ?? 0);
//       const total_investment = portfolio?.total_investment ?? 0;
//       if (!selectedStock || total > total_investment) return;
//       try {
//         createStockPurchase({
//           data: selectedStock,
//           user_id: user?.id,
//           full_name: user?.fullName,
//           stock_initial_value: total,
//           stock_value_entered: 0.0,
//           stock_token: "fromBalance",
//           stock_quantity: quantities[selectedStock.id] || 1,
//           stock_status: "approved",
//           stock_token_address: "fromBalance",
//         })
  
//         const newTotalInvestment = portfolio.total_investment - total;
//         console.log("New total investment:", newTotalInvestment);
//         // await databases.updateDocument(
//         //   ENV.databaseId,
//         //   ENV.collections.profile,
//         //   user?.id || "",
//         //   { total_investment: newTotalInvestment }
//         // );
//         setShowAlertDialog(false);
//         setSelectedStock(null);
//         setShowSuccessMessage(true)
//         toast("Stock Purchased!", { description: "Thank you for your purchase!" });
//       } catch (error) {
//         console.error("Error purchasing stock:", error);
//         toast("Error purchasing stock!", { description: "Please try again later." });
//       }
//     };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">Live Stock Prices</CardTitle>
        </CardHeader>
      </Card>

      {/* Search Input and Exchange Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search stocks by symbol or company name..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedExchange} onValueChange={handleExchangeChange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Exchange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nasdaq">NASDAQ</SelectItem>
                  <SelectItem value="nyse">NYSE</SelectItem>
                  <SelectItem value="amex">AMEX</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Cards */}
      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Loading stocks...</div>
          </div>
        ) : stocks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-lg">No stocks found</div>
          </div>
        ) : (
          stocks.map((stock) => {
          const quantity = quantities[stock.symbol] || 0
          const total = quantity * stock.price

          return (
            <Card key={stock.symbol} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  {/* Stock Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{stock.symbol}</h3>
                        <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {stock.exchange}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Price & Change */}
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-bold text-foreground">{formatPrice(stock.price)}</div>
                    <div className="mt-1">{formatChange(stock.change, stock.changesPercentage)}</div>
                  </div>

                  {/* Day Range */}
                  <div className="text-center md:text-left">
                    <div className="text-sm text-muted-foreground">Day Range</div>
                    <div className="font-medium text-foreground">
                      {formatPrice(stock.dayLow)} - {formatPrice(stock.dayHigh)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(stock.symbol, quantity - 1)}
                      disabled={quantity <= 0}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => updateQuantity(stock.symbol, Number.parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min="0"
                      placeholder="0"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(stock.symbol, quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Buy Button & Total */}
                  <div className="text-center">
                    {quantity > 0 && (
                      <div className="text-sm text-muted-foreground mb-2">
                        Total: <span className="font-bold text-foreground">{formatPrice(total)}</span>
                      </div>
                    )}
                    <Button
                      onClick={() => handleBuy(stock.symbol, quantity, stock.price)}
                      disabled={quantity <= 0}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                    >
                      Buy {quantity > 0 ? `${quantity} shares` : ""}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        }))}
      </div>

      {pagination && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} total stocks)
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!pagination.hasPrev || loading}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {/* Show page numbers around current page */}
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const startPage = Math.max(1, currentPage - 2)
                    const page = startPage + i
                    if (page > pagination.totalPages) return null
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(page)}
                        disabled={loading}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!pagination.hasNext || loading}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
