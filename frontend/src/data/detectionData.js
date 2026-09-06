export const detectionPresets = [
  {
    id: "preset-cotton-bollworm",
    title: "Cotton — Pink Bollworm",
    crop: "Cotton",
    category: "Pest Infestation",
    thumbnail: "/samples/cotton_bollworm.svg",
    previewImage: "/samples/cotton_bollworm.svg",
    diagnosis: {
      crop: "Cotton (Gossypium hirsutum)",
      issue: "Pink Bollworm (Pectinophora gossypiella)",
      confidence: 94,
      severity: "High",
      severityVariant: "critical",
      stage: "Active Larval Bore Stage",
      whatWeFound: "Visual signs indicate pink bollworm larvae entering the developing cotton boll. The pest attacks flowers and tender bolls, leading to 'rosetted flowers' and stained lint.",
      symptoms: [
        "Premature dropping of unopened flowers and squares",
        "Characteristic rosette shape in affected flowers due to larval webbing",
        "Minute entry bore holes on green bolls, often plugged with frass",
        "Discolored, stained lint and damaged internal seed embryos"
      ],
      recommendation: {
        immediateAction: "Physically inspect and collect fallen squares and rosetted flowers. Destroy infested bolls away from the main plot to prevent larvae pupation in the soil.",
        managementApproach: "Integrated Pest Management (IPM) & Biological Suppression",
        biologicalOptions: [
          "Beauveria bassiana (1.15% WP) bio-pesticide spray during evening hours when humidity is favorable.",
          "Release egg parasitoid Trichogramma bactrae at 50,000 per acre at weekly intervals.",
          "Bacillus thuringiensis (Bt kurstaki) formulation for caterpillar suppression in early instars."
        ],
        culturalPractices: [
          "Install 5 to 8 Delta or Sleeve pheromone traps per acre for continuous adult moth population monitoring.",
          "Plant Okra (Bhindi) as a trap crop around border rows.",
          "Avoid excessive synthetic nitrogen fertilizers which create dense, succulent foliage attractive to moths."
        ],
        safetyWarning: "Prototype Agronomic Guidance. Always consult your local Krishi Vigyan Kendra (KVK) or Block Agricultural Development Officer before applying commercial chemical formulations."
      }
    }
  },
  {
    id: "preset-soybean-rust",
    title: "Soybean — Asian Rust",
    crop: "Soybean",
    category: "Fungal Infection",
    thumbnail: "/samples/soybean_rust.svg",
    previewImage: "/samples/soybean_rust.svg",
    diagnosis: {
      crop: "Soybean (Glycine max)",
      issue: "Asian Soybean Rust (Phakopsora pachyrhizi)",
      confidence: 91,
      severity: "Medium",
      severityVariant: "warning",
      stage: "Early Pustule Formation",
      whatWeFound: "Identified small, tan-to-reddish-brown fungal pustules on the undersides of middle and lower canopy leaves. High relative humidity and warm temperatures accelerate spread.",
      symptoms: [
        "Pinpoint polygonal lesions restricted by minor leaf veins",
        "Volcano-shaped pustules on the lower leaf surface producing tan spores",
        "Premature yellowing and leaf defoliation starting from the bottom canopy upward",
        "Poor pod filling and smaller grain size if left unmanaged"
      ],
      recommendation: {
        immediateAction: "Improve air circulation in the field. Avoid sprinkler irrigation during late afternoons to reduce leaf wetness duration.",
        managementApproach: "Early Canopy Protection & Biocontrol",
        biologicalOptions: [
          "Foliar spray of Trichoderma harzianum or Pseudomonas fluorescens bioprotectant.",
          "Neem seed kernel extract (NSKE 5%) as an early organic fungistatic deterrent."
        ],
        culturalPractices: [
          "Maintain proper plant-to-plant spacing (45 cm x 10 cm) to ensure adequate sun penetration.",
          "Practice crop rotation with non-host cereals (maize or sorghum) next season.",
          "Scout lower leaves every 3 days during high-humidity periods."
        ],
        safetyWarning: "Prototype Agronomic Guidance. Always verify fungicide choices with approved Central Insecticides Board & Registration Committee (CIB&RC) schedules."
      }
    }
  },
  {
    id: "preset-tomato-blight",
    title: "Tomato — Early Blight",
    crop: "Tomato",
    category: "Fungal Disease",
    thumbnail: "/samples/tomato_blight.svg",
    previewImage: "/samples/tomato_blight.svg",
    diagnosis: {
      crop: "Tomato (Solanum lycopersicum)",
      issue: "Early Blight (Alternaria solani)",
      confidence: 92,
      severity: "High",
      severityVariant: "critical",
      stage: "Foliar Necrosis Stage",
      whatWeFound: "Characteristic concentric brown-black target-like spots observed on older leaves. Fungus overwinters in crop debris and splashes up with rain or irrigation water.",
      symptoms: [
        "Dark brown circular spots with concentric target rings on older leaves",
        "Yellow chlorotic halo surrounding necrotic lesions",
        "Stem cankers and sunken leathery rot on the fruit calyx end",
        "Lower leaf withering and premature defoliation exposing fruit to sunscald"
      ],
      recommendation: {
        immediateAction: "Prune off heavily infected lower foliage with sanitized shears. Avoid overhead irrigation; use drip or furrow watering at ground level.",
        managementApproach: "Cultural Sanitation & Preventive Bioprotection",
        biologicalOptions: [
          "Soil drench and foliar mist of Trichoderma viride (1% WP) at 10-day intervals.",
          "Bacillus subtilis biological bactericide/fungicide root zone treatment."
        ],
        culturalPractices: [
          "Stake plants upright with bamboo or trellising to keep foliage elevated from soil splash.",
          "Apply organic straw mulch around plant bases to create a physical barrier against soil-borne spores.",
          "Never compost infected tomato vines."
        ],
        safetyWarning: "Prototype Agronomic Guidance. Adhere strictly to recommended pre-harvest intervals (PHI) if using any agricultural protective spray."
      }
    }
  },
  {
    id: "preset-cotton-healthy",
    title: "Cotton — Healthy Canopy",
    crop: "Cotton",
    category: "Healthy Baseline",
    thumbnail: "/samples/cotton_healthy.svg",
    previewImage: "/samples/cotton_healthy.svg",
    diagnosis: {
      crop: "Cotton (Gossypium hirsutum)",
      issue: "No Pathogen Detected (Healthy)",
      confidence: 97,
      severity: "Low",
      severityVariant: "healthy",
      stage: "Vegetative / Squaring Stage",
      whatWeFound: "The scanned leaf specimen displays deep green chlorophyll pigmentation, smooth vein structure, and no visible signs of sucking pests, fungal spots, or larval boring.",
      symptoms: [
        "Vibrant uniform green coloration across entire leaf blade",
        "Intact leaf margins with zero chewing or puncture damage",
        "Healthy white-cream squares and clean stem nodal development",
        "Vigorous apical growth without leaf curl or stunting"
      ],
      recommendation: {
        immediateAction: "No curative chemical or biological intervention needed. Continue regular monitoring protocol.",
        managementApproach: "Preventive Soil Health & Weekly Field Scouting",
        biologicalOptions: [
          "Maintain soil microbial diversity with vermicompost and Jeevamrutha soil enrichment.",
          "Encourage beneficial predators such as Ladybird beetles and Chrysoperla (lacewings)."
        ],
        culturalPractices: [
          "Maintain routine pheromone trap counts once per week.",
          "Regulate irrigation according to soil tensiometer readings or soil moisture levels."
        ],
        safetyWarning: "Prototype Guidance. Maintaining regular scouting prevents minor pest populations from reaching Economic Injury Level (EIL)."
      }
    }
  }
];

export const defaultDetectionResult = detectionPresets[0].diagnosis;
