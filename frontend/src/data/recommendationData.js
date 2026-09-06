export const cropsRecommendationCatalog = {
  Cotton: [
    {
      id: "cotton-pbw",
      issueName: "Pink Bollworm (Pectinophora gossypiella)",
      threatCategory: "Pest Infestation",
      severity: "High",
      summary: "Invasive caterpillar that enters young green bolls, destroying internal seed embryos and staining cotton lint.",
      immediateAction: "Physically collect and destroy rosetted flowers and premature dropped squares away from the field. Do not leave picked infested bolls on field bunds.",
      ipmApproach: "Integrated Pest Management prioritizing biocontrol and mating disruption.",
      biologicalOptions: [
        "Beauveria bassiana (1.15% WP) bio-agent foliar application at 5g/liter of water during evening hours.",
        "Release egg parasitoid Trichogramma bactrae at 50,000 to 60,000 per acre starting at first square formation.",
        "Bacillus thuringiensis (Bt kurstaki) formulation for young caterpillars."
      ],
      culturalPractices: [
        "Erect 5 to 8 pheromone sleeve traps per acre for tracking peak moth flights.",
        "Plant border refuge rows or okra trap crop to divert egg laying.",
        "Refrain from late-season nitrogen applications which promote lush succulent squares attractive to gravid moths."
      ],
      monitoringGuideline: "Examine 20 randomly chosen green bolls across the field weekly. If more than 2 bolls contain larvae or bore marks, initiate biological biocontrol immediately.",
      safetyNotice: "Prototype agronomic advice. Always consult local Krishi Vigyan Kendra (KVK) guidelines for approved product certifications."
    },
    {
      id: "cotton-whitefly",
      issueName: "Whitefly (Bemisia tabaci)",
      threatCategory: "Sucking Pest",
      severity: "Medium",
      summary: "Tiny sap-sucking nymphs that excrete sticky honeydew promoting sooty mold and transmitting Cotton Leaf Curl Virus.",
      immediateAction: "Install yellow sticky sheets at canopy height across the field to trap flying adults.",
      ipmApproach: "Biological predation encouragement and organic botanical deterrents.",
      biologicalOptions: [
        "Neem Oil 10,000 ppm at 2 to 3 ml/liter with mild surfactant for nymph suffocation.",
        "Conserve predatory green lacewings (Chrysoperla carnea) and ladybird beetles."
      ],
      culturalPractices: [
        "Destroy alternative weed hosts like Parthenium (Gajar ghas) and Abutilon on field borders.",
        "Maintain spacing to allow cross-breeze between rows."
      ],
      monitoringGuideline: "Check undersides of 3 leaves (top, middle, bottom) per plant across 20 sample plants.",
      safetyNotice: "Avoid broad-spectrum chemical pyrethroids which wipe out natural whitefly predators and cause pest resurgence."
    },
    {
      id: "cotton-leafspot",
      issueName: "Alternaria Leaf Spot",
      threatCategory: "Fungal Disease",
      severity: "Medium",
      summary: "Fungal leaf pathogen causing target-like brown spots that coalesce into ragged holes during wet weather.",
      immediateAction: "Remove and burn severely infected lower leaves touching damp soil.",
      ipmApproach: "Foliar bio-antagonist protection and canopy moisture reduction.",
      biologicalOptions: [
        "Trichoderma viride (2% WP) foliar mist at 10-day intervals.",
        "Pseudomonas fluorescens biological foliar spray."
      ],
      culturalPractices: [
        "Improve drainage trenches to prevent water stagnation around plant crowns.",
        "Balanced potash (potassium) fertilization to strengthen leaf cell wall integrity."
      ],
      monitoringGuideline: "Inspect lower foliage following cloudy or rain periods exceeding 48 hours.",
      safetyNotice: "Ensure proper personal protective equipment (mask and gloves) when spraying any bio-suspension."
    }
  ],
  Soybean: [
    {
      id: "soybean-rust",
      issueName: "Asian Soybean Rust (Phakopsora pachyrhizi)",
      threatCategory: "Fungal Disease",
      severity: "High",
      summary: "Rapidly spreading windborne rust that produces tan volcanic pustules on undersides of leaves, causing catastrophic defoliation.",
      immediateAction: "Scout middle and lower leaf canopies for reddish-brown polygonal specks.",
      ipmApproach: "Early preventative organic barrier and tolerant variety selection.",
      biologicalOptions: [
        "Foliar application of Trichoderma harzianum bio-agent.",
        "Neem Seed Kernel Extract (NSKE 5%) sprayed at early flower initiation."
      ],
      culturalPractices: [
        "Avoid overhead irrigation in late afternoon; ensure leaf drying before nightfall.",
        "Opt for rust-tolerant certified seed varieties for the next sowing cycle."
      ],
      monitoringGuideline: "Survey lower leaves twice weekly once flowering starts.",
      safetyNotice: "Prototype recommendation. Always confirm disease identification through physical spore inspection."
    },
    {
      id: "soybean-girdle",
      issueName: "Girdle Beetle (Oberioides brevis)",
      threatCategory: "Insect Pest",
      severity: "Medium",
      summary: "Female beetle cuts two circular rings on petiole or stem and deposits eggs inside, causing leaves above the girdle to wither.",
      immediateAction: "Handpick and burn freshly girdled petioles containing newly laid eggs before hatching.",
      ipmApproach: "Mechanical sanitation and border scouting.",
      biologicalOptions: [
        "Metarhizium anisopliae or Beauveria bassiana spray on lower stem regions.",
        "Application of neem-based formulations at 1500 ppm."
      ],
      culturalPractices: [
        "Maintain clean bunds free of wild leguminous weeds.",
        "Rotate fields with sorghum or millet every 2-3 years."
      ],
      monitoringGuideline: "Walk along field diagonals at 10-day intervals during early vegetative growth.",
      safetyNotice: "Destroy gathered clipped stems safely away from livestock fodder."
    }
  ],
  Tomato: [
    {
      id: "tomato-earlyblight",
      issueName: "Early Blight (Alternaria solani)",
      threatCategory: "Fungal Disease",
      severity: "High",
      summary: "Dark brown bullseye lesions with yellow halos on older leaves that spread upward, defoliating plants and sunscalding fruit.",
      immediateAction: "Prune off infected lower leaves with sterilized shears. Water only at soil level, avoiding leaf splash.",
      ipmApproach: "Clean cultural sanitation and preventive biological film.",
      biologicalOptions: [
        "Trichoderma viride root drench and canopy spray.",
        "Bacillus subtilis biological bactericide/fungicide treatment."
      ],
      culturalPractices: [
        "Stake and trellis tomato vines to keep foliage elevated from soil spores.",
        "Apply organic paddy straw mulch around root zones.",
        "Never compost diseased tomato crop debris."
      ],
      monitoringGuideline: "Inspect lower foliage weekly, especially after heavy rains or overhead irrigation.",
      safetyNotice: "Prototype guidance. Ensure proper pre-harvest intervals for any spray application."
    },
    {
      id: "tomato-leafcurl",
      issueName: "Tomato Leaf Curl Virus (ToLCV)",
      threatCategory: "Viral Infection",
      severity: "High",
      summary: "Severe upward and inward leaf curling, stunting, and bushy rosette growth transmitted by whitefly vectors.",
      immediateAction: "Rogue out and bury infected plants immediately to prevent the virus from spreading to neighboring plants.",
      ipmApproach: "Vector whitefly control via physical barriers and bio-deterrents.",
      biologicalOptions: [
        "Neem seed kernel extract 5% to repel feeding whiteflies.",
        "Beauveria bassiana spray targeting whitefly nymphs on leaf undersides."
      ],
      culturalPractices: [
        "Deploy yellow sticky traps (15 per acre) around border rows.",
        "Plant border barrier crops such as 3 rows of tall maize or bajra.",
        "Use 40-mesh insect-proof nylon nets in nursery seedbeds."
      ],
      monitoringGuideline: "Daily nursery inspection and weekly field survey for vector whitefly clusters.",
      safetyNotice: "Viruses cannot be cured once inside the plant; management must focus entirely on early rogueing and vector control."
    }
  ],
  Wheat: [
    {
      id: "wheat-rust",
      issueName: "Yellow / Stripe Rust (Puccinia striiformis)",
      threatCategory: "Fungal Disease",
      severity: "High",
      summary: "Bright yellow-orange linear stripes of powdery pustules on leaves that inhibit photosynthesis and shrivel grains.",
      immediateAction: "Report early yellow stripe sightings to the local agricultural officer immediately for district surveillance.",
      ipmApproach: "Resistant seed selection and clean seedbed preparation.",
      biologicalOptions: [
        "Application of bio-fungicide formulations like Trichoderma viride.",
        "Seed treatment with bio-agents before winter sowing."
      ],
      culturalPractices: [
        "Sow certified rust-resistant wheat varieties (e.g., HD-2967, DBW-187, DBW-303).",
        "Avoid late sowing which exposes seedlings to warmer rust-conducive temperatures.",
        "Avoid excess nitrogen fertilizer."
      ],
      monitoringGuideline: "Inspect fields weekly from December through February, checking lower leaves for yellow streaks.",
      safetyNotice: "Prototype guidance. Contact nearest agricultural university extension for localized rust advisories."
    }
  ]
};
