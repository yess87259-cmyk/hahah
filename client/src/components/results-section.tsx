import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChartModal from "@/components/chart-modal";
import { BarChart3, TrendingUp, MapPin, Zap, Eye, ArrowRight } from "lucide-react";

export default function ResultsSection() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const charts = [
    {
      id: "congestion",
      title: "Congestion Distribution",
      icon: BarChart3,
      description: "Real-time citywide traffic analysis",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      modalDescription: "This interactive pie chart visualization shows the real-time distribution of congestion levels across Visakhapatnam. The analysis reveals traffic patterns categorized into Low (Green), Medium (Yellow), and High (Red) congestion zones. This breakdown helps identify the proportion of city areas experiencing different levels of traffic intensity, enabling targeted resource allocation and infrastructure planning.",
    },
    {
      id: "hourly",
      title: "Hourly Traffic Patterns", 
      icon: TrendingUp,
      description: "Peak hour identification and trends",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      modalDescription: "This dynamic stacked bar chart demonstrates traffic congestion patterns throughout a 24-hour cycle. Peak hours typically occur during morning (8-10 AM) and evening (6-8 PM) rush periods, showing maximum red zone congestion. The visualization helps identify optimal travel times and supports traffic signal optimization strategies for different hours of the day.",
    },
    {
      id: "daily",
      title: "Daily Trend Analysis",
      description: "Weekly traffic pattern insights", 
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      modalDescription: "The daily trend analysis shows average congestion scores across different days, revealing patterns in weekday versus weekend traffic. Typically, weekdays show higher congestion due to commuter traffic, while weekends may have different patterns based on recreational activities. This data supports long-term planning and resource scheduling.",
    },
    {
      id: "heatmap",
      title: "Traffic Heatmap",
      icon: MapPin,
      description: "Location-based intensity mapping",
      color: "from-orange-500 to-red-500", 
      bgColor: "from-orange-50 to-red-50",
      modalDescription: "This advanced heatmap visualization displays congestion intensity across different locations and hours, providing a comprehensive view of when and where traffic congestion peaks. Darker areas indicate higher congestion levels, helping identify critical intersection points and time-location combinations that require immediate attention from traffic management authorities.",
    },
    {
      id: "accidents",
      title: "Accident Hotspots",
      icon: MapPin,
      description: "High-risk location identification",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      modalDescription: "This critical bar chart identifies the top 10 accident-prone locations in Visakhapatnam, ranked by total number of reported incidents. These hotspots require immediate safety interventions such as improved signage, speed bumps, better lighting, or traffic signal optimization. The data guides priority setting for safety infrastructure investments.",
    },
    {
      id: "fatalities",
      title: "Safety Analysis",
      icon: MapPin,
      description: "Critical safety metrics",
      color: "from-gray-700 to-gray-900",
      bgColor: "from-gray-50 to-gray-100",
      modalDescription: "This critical analysis highlights locations with the highest fatality rates, representing the most dangerous areas requiring urgent safety measures. These locations demand comprehensive safety audits, emergency response system improvements, and potentially major infrastructure redesigns to prevent future casualties and protect public safety.",
    },
    {
      id: "vehicle",
      title: "Traffic Flow Analysis",
      icon: BarChart3,
      description: "Vehicle movement patterns",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      modalDescription: "This scatter plot analysis examines the relationship between queue density (vehicles waiting) and stop density (vehicles stopped) across different congestion levels. The visualization helps understand traffic flow dynamics and identifies patterns that indicate efficient versus problematic traffic conditions, supporting optimization of traffic signal timing.",
    },
    {
      id: "ml", 
      title: "AI Model Performance",
      icon: Zap,
      description: "Machine learning accuracy metrics",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-50 to-blue-50",
      modalDescription: "This comparison chart evaluates the performance of three machine learning models: Linear Regression, Decision Tree, and Random Forest. Metrics include RMSE (Root Mean Square Error) and R² scores to determine prediction accuracy. Random Forest typically shows the best performance for traffic prediction due to its ability to handle complex patterns and feature interactions.",
      insights: [
        "Random Forest: Highest accuracy for congestion prediction",
        "Decision Tree: Good interpretability for policy makers", 
        "Linear Regression: Baseline model for comparison"
      ]
    },
  ];

  const selectedChartData = charts.find(chart => chart.id === selectedChart);

  return (
    <section id="results" className="py-20 bg-gradient-to-br from-gray-50 to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Interactive Analytics
            </div>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" data-testid="results-title">
              Analytics Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto" data-testid="results-description">
              Comprehensive traffic analysis powered by machine learning with real-time visualizations and predictive insights
            </p>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {charts.map((chart, index) => {
              const IconComponent = chart.icon;
              return (
                <Card
                  key={chart.id}
                  className={`group relative overflow-hidden bg-gradient-to-br ${chart.bgColor} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedChart(chart.id)}
                  data-testid={`chart-card-${chart.id}`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${chart.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 mb-4 bg-gradient-to-r ${chart.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors" data-testid={`chart-title-${chart.id}`}>
                      {chart.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed" data-testid={`chart-description-${chart.id}`}>
                      {chart.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors" data-testid={`chart-read-more-${chart.id}`}>
                      <Eye className="w-4 h-4" />
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Modal */}
      {selectedChartData && (
        <ChartModal
          isOpen={selectedChart !== null}
          onClose={() => setSelectedChart(null)}
          title={selectedChartData.title}
          icon={selectedChartData.title.split(' ')[0]}
          chartId={selectedChartData.id}
          description={selectedChartData.modalDescription}
          insights={selectedChartData.insights}
        />
      )}
    </section>
  );
}