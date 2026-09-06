export const regionalAlertsData = {
  activeRegion: "Vidarbha & Western Maharashtra Agriculture Division",
  lastClusterSync: "Today at 09:15 AM (Simulated Geo-Fence Engine)",
  hotspots: [
    {
      id: "hotspot-01",
      name: "Amravati - Morshi Cotton Belt",
      distance: "18 km away",
      crop: "Cotton",
      threat: "Pink Bollworm Outbreak",
      riskLevel: "CRITICAL",
      severityVariant: "critical",
      clusterReports: 42,
      spreadTrend: "Spreading Eastward (+14% this week)",
      advisory: "High larval activity inside developing bolls. All farmers with cotton crops aged 60-90 days must scout at least 20 bolls per acre for rosette blooms and exit holes.",
      actions: [
        "Erect 5-8 pheromone traps per acre immediately to monitor moth catches.",
        "Destruct rosetted flowers and fallen squares away from field boundaries.",
        "Evening application of Beauveria bassiana bio-agent."
      ]
    },
    {
      id: "hotspot-02",
      name: "Yavatmal - Wani Cluster",
      distance: "45 km away",
      crop: "Soybean",
      threat: "Stem Fly & Girdle Beetle",
      riskLevel: "WARNING",
      severityVariant: "warning",
      clusterReports: 28,
      spreadTrend: "Moderate Localized Cluster",
      advisory: "Foliar girdle symptoms observed on soybean stems due to alternating rain and hot humid spells. Girdled branches will wilt rapidly if unmonitored.",
      actions: [
        "Collect and bury dried girdled twigs carrying pupae.",
        "Spray 5% Neem Seed Kernel Extract (NSKE) as oviposition deterrent.",
        "Avoid high plant density; ensure ventilation through crop rows."
      ]
    },
    {
      id: "hotspot-03",
      name: "Nagpur - Katol Citrus & Tomato Zone",
      distance: "62 km away",
      crop: "Tomato",
      threat: "Early Blight & Tomato Leaf Curl",
      riskLevel: "WARNING",
      severityVariant: "warning",
      clusterReports: 19,
      spreadTrend: "Stable Cluster",
      advisory: "Early blight concentric rings spreading in polyhouse and open fields with excessive morning dew. Whitefly vectors transmitting curl virus.",
      actions: [
        "Sanitize lower dead foliage from contact with wet soil.",
        "Deploy yellow sticky cards (15-20 per acre).",
        "Trichoderma viride root drench and foliar bio-spray."
      ]
    },
    {
      id: "hotspot-04",
      name: "Akola - Murtizapur Pulse Basin",
      distance: "74 km away",
      crop: "Pigeonpea (Tur / Arhar)",
      threat: "Pod Borer (Helicoverpa armigera) Alert",
      riskLevel: "INFO",
      severityVariant: "info",
      clusterReports: 11,
      spreadTrend: "Early Emergence Detected",
      advisory: "First generation Helicoverpa moths caught in surveillance light traps. Pod borer eggs detected on flowering terminals.",
      actions: [
        "Plant bird perches (T-shaped wooden perches @ 20/acre) to attract insectivorous birds.",
        "Spray HaNPV (Helicoverpa nuclear polyhedrosis virus) at 250 LE/acre.",
        "Monitor flower clusters twice weekly."
      ]
    }
  ],
  regionalStats: {
    totalReportsToday: 134,
    highRiskDistricts: 3,
    quarantineClusters: 1,
    activeMonitoringPoles: 84
  }
};
