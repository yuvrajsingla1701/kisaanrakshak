export const dashboardOverview = {
  farmerName: "Ramesh Patil",
  village: "Amravati, Maharashtra",
  primaryCrop: "Cotton & Soybean",
  stats: [
    {
      id: "scanned",
      title: "Crops Scanned",
      value: 24,
      change: "+3 this week",
      icon: "ScanLine",
      badgeColor: "bg-agri-100 text-agri-800 border-agri-200"
    },
    {
      id: "healthy",
      title: "Healthy",
      value: 16,
      change: "66.7% of total",
      icon: "ShieldCheck",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "attention",
      title: "Needs Attention",
      value: 5,
      change: "Early stage warning",
      icon: "AlertCircle",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      id: "critical",
      title: "Critical",
      value: 3,
      change: "Requires immediate IPM",
      icon: "AlertOctagon",
      badgeColor: "bg-red-50 text-red-700 border-red-200"
    }
  ],
  farmConditions: {
    location: "Farm Plot #4 — Amravati East",
    updatedAt: "Today, 10:30 AM (Simulated)",
    temperature: { value: 28, unit: "°C", status: "Optimal" },
    humidity: { value: 68, unit: "%", status: "Favorable for fungal spores" },
    rainProbability: { value: 35, unit: "%", status: "Light showers expected" },
    windSpeed: { value: 12, unit: "km/h", status: "Gentle breeze" },
    soilMoisture: { value: 44, unit: "%", status: "Adequate" }
  },
  regionalBannerAlert: {
    id: "reg-alert-01",
    crop: "Cotton",
    issue: "Pink Bollworm (Pectinophora gossypiella)",
    riskLevel: "HIGH",
    riskBadgeColor: "bg-red-600 text-white",
    location: "Vidarbha Cluster (18 km from your farm)",
    reportedCount: "42 nearby farmers reported this week",
    summary: "Clustered Pink Bollworm activity reported in neighboring talukas.",
    action: "Inspect flowers and 20 green bolls per acre for rosette blooms or exit holes. Install pheromone traps at 5 traps/acre immediately.",
    date: "06 Sep 2026"
  },
  healthTrends: [
    { week: "W1 Aug", healthy: 18, attention: 2, critical: 1 },
    { week: "W2 Aug", healthy: 17, attention: 3, critical: 2 },
    { week: "W3 Aug", healthy: 19, attention: 4, critical: 2 },
    { week: "W4 Aug", healthy: 18, attention: 3, critical: 1 },
    { week: "W1 Sep", healthy: 16, attention: 5, critical: 3 }
  ],
  recentScans: [
    {
      id: "scan-01",
      crop: "Cotton",
      issue: "Pink Bollworm",
      confidence: 94,
      severity: "High",
      severityVariant: "critical",
      date: "06 Sep 2026",
      status: "Needs Action",
      thumbnail: "/samples/cotton_bollworm.svg",
      summary: "Larval infestation detected inside developing boll.",
      recommendationSummary: "Install pheromone traps; spray Beauveria bassiana."
    },
    {
      id: "scan-02",
      crop: "Soybean",
      issue: "Healthy Crop",
      confidence: 97,
      severity: "Low",
      severityVariant: "healthy",
      date: "05 Sep 2026",
      status: "Healthy",
      thumbnail: "/samples/soybean_healthy.svg",
      summary: "Normal leaf canopy, vibrant chlorophyll, no lesions.",
      recommendationSummary: "Maintain current irrigation and bi-weekly scouting."
    },
    {
      id: "scan-03",
      crop: "Cotton",
      issue: "Alternaria Leaf Spot",
      confidence: 89,
      severity: "Medium",
      severityVariant: "warning",
      date: "04 Sep 2026",
      status: "Monitor",
      thumbnail: "/samples/cotton_leafspot.svg",
      summary: "Concentric brown rings on lower leaves under high humidity.",
      recommendationSummary: "Prune lower infected leaves; apply Trichoderma viride."
    },
    {
      id: "scan-04",
      crop: "Tomato",
      issue: "Early Blight (Alternaria solani)",
      confidence: 92,
      severity: "High",
      severityVariant: "critical",
      date: "03 Sep 2026",
      status: "Needs Action",
      thumbnail: "/samples/tomato_blight.svg",
      summary: "Dark concentric bullseye lesions on older foliage.",
      recommendationSummary: "Improve plant spacing; avoid overhead watering."
    },
    {
      id: "scan-05",
      crop: "Wheat",
      issue: "Healthy Seedlings",
      confidence: 96,
      severity: "Low",
      severityVariant: "healthy",
      date: "01 Sep 2026",
      status: "Healthy",
      thumbnail: "/samples/wheat_healthy.svg",
      summary: "Uniform germination with healthy green tillers.",
      recommendationSummary: "Top dress with balanced organic compost as planned."
    }
  ]
};
