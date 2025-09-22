import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKeyIndicators, useLoadCSV } from "@/hooks/use-traffic-data";
import { Loader2, RefreshCw, Upload, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CSVUpload from "./csv-upload";

export default function KeyIndicators() {
  const { data: indicators, isLoading, error } = useKeyIndicators();
  const loadCSVMutation = useLoadCSV();
  const hasAttemptedAutoLoad = useRef(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (hasAttemptedAutoLoad.current) return;
    if (isLoading || loadCSVMutation.isPending || error) return;

    if (!indicators || (indicators.totalAccidents === 0 && indicators.totalFatalities === 0)) {
      hasAttemptedAutoLoad.current = true;
      loadCSVMutation.mutate();
    }
  }, [isLoading, indicators, error, loadCSVMutation.isPending]);

  const handleLoadData = () => {
    loadCSVMutation.mutate();
  };

  if (isLoading) {
    return (
      <section id="indicators" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-gray-700 font-medium">Loading traffic analytics...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="indicators" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
              <AlertTriangle className="w-12 h-12 text-red-500" />
              <p className="text-red-600 font-medium">Failed to load traffic indicators</p>
              <Button 
                onClick={handleLoadData} 
                disabled={loadCSVMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loadCSVMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Retry Loading Data
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const indicatorCards = [
    {
      icon: AlertTriangle,
      title: "Total Accidents",
      value: indicators?.totalAccidents?.toLocaleString() || "0",
      description: "Reported incidents across all monitored zones",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      iconColor: "text-red-600",
    },
    {
      icon: Activity,
      title: "Total Fatalities",
      value: indicators?.totalFatalities?.toLocaleString() || "0",
      description: "Lives lost due to traffic incidents",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      iconColor: "text-orange-600",
    },
    {
      icon: TrendingUp,
      title: "Avg Congestion Score",
      value: indicators?.avgCongestion?.toFixed(2) || "0.00",
      description: "Normalized congestion level (0-1 scale)",
      color: "from-blue-500 to-purple-500",
      bgColor: "from-blue-50 to-purple-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section id="indicators" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              Real-time Analytics
            </div>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" data-testid="indicators-title">
              Key Traffic Indicators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="indicators-description">
              Critical traffic statistics computed from comprehensive data analysis and machine learning models
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => setShowUpload(!showUpload)}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid="button-toggle-upload"
            >
              <Upload className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Upload CSV Data
            </Button>

            <Button
              onClick={handleLoadData}
              disabled={loadCSVMutation.isPending}
              variant="outline"
              className="group px-8 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid="button-load-data"
            >
              {loadCSVMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-3" />
                  Processing Data...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                  Load Sample Data
                </>
              )}
            </Button>
          </div>

          {/* CSV Upload Component */}
          {showUpload && (
            <div className="mb-16 animate-fade-in">
              <CSVUpload />
            </div>
          )}

          {/* Status Messages */}
          {loadCSVMutation.isError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl max-w-2xl mx-auto animate-fade-in">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 font-medium">
                  Failed to load CSV: {loadCSVMutation.error instanceof Error ? loadCSVMutation.error.message : "Unknown error"}
                </p>
              </div>
            </div>
          )}

          {loadCSVMutation.isSuccess && !loadCSVMutation.isPending && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl max-w-2xl mx-auto animate-fade-in">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-700 font-medium">
                  CSV data loaded successfully! Analytics have been updated.
                </p>
              </div>
            </div>
          )}

          {/* Indicator Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {indicatorCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={index}
                  className={`group relative overflow-hidden bg-gradient-to-br ${card.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  data-testid={`indicator-card-${index}`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="text-center">
                      {/* Icon */}
                      <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className={`w-10 h-10 ${card.iconColor}`} />
                      </div>
                      
                      {/* Value */}
                      <div className={`text-5xl font-black mb-3 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} data-testid={`indicator-value-${index}`}>
                        {card.value}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4 text-gray-800" data-testid={`indicator-title-${index}`}>
                        {card.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed" data-testid={`indicator-description-${index}`}>
                        {card.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}