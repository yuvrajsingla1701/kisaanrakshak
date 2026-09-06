import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Camera,
  SearchCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sprout,
  Activity,
  History,
  Languages,
  Mic,
  FileText,
  MapPin,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingFooter } from '../components/landing/LandingFooter';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { t } = useLanguage();
  const { loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleLaunchDemo = () => {
    loginDemo();
    navigate('/dashboard');
  };

  const keyFeatures = [
    {
      title: "Crop Disease Detection",
      desc: "Instant automated diagnosis of foliar fungal spots, bacterial blights, and viral leaf curls with high accuracy.",
      icon: SearchCheck
    },
    {
      title: "Pest Identification",
      desc: "Early detection of destructive crop borers, whiteflies, aphids, and defoliators on tender leaves and flowers.",
      icon: Activity
    },
    {
      title: "Early Warning Alerts",
      desc: "Receive localized advisory notices when neighboring farm clusters report similar pest or disease activity.",
      icon: AlertTriangle
    },
    {
      title: "Treatment Recommendations",
      desc: "Scientifically structured Integrated Pest Management (IPM) featuring safe biological controls and cultural remedies.",
      icon: Sprout
    },
    {
      title: "Crop Health History",
      desc: "Track infection trends and plot health history across crop growth cycles to prevent repeat outbreaks.",
      icon: History
    },
    {
      title: "Regional Risk Monitoring",
      desc: "Visual district-wide cluster map showing spreading patterns and quarantine warnings for agricultural officers.",
      icon: MapPin
    },
    {
      title: "Hindi / Marathi Support",
      desc: "Accessible vernacular interfaces built specifically for farmers in Maharashtra and broader Indian rural regions.",
      icon: Languages
    },
    {
      title: "Voice Assistance Ready",
      desc: "Voice prompt architecture ready for hands-free queries in regional dialects while working in the field.",
      icon: Mic
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col selection:bg-agri-200">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-200/80 bg-linear-to-b from-agri-50/50 via-[#FBFBFA] to-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Problem statement badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-agri-100 border border-agri-200 text-agri-900 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-agri-600 animate-pulse"></span>
                <span>{t.sihBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.15]">
                {t.landing.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
                {t.landing.heroSubtitle}
              </p>

              {/* Primary / Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  size="lg"
                  onClick={() => navigate('/detect')}
                  className="bg-agri-800 hover:bg-agri-900 text-white shadow-sm font-semibold"
                >
                  {t.landing.checkCropBtn}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleLaunchDemo}
                  className="border-agri-700/30 text-agri-900 hover:bg-agri-50 font-semibold"
                >
                  {t.landing.demoLoginBtn}
                </Button>
              </div>

              {/* Core farmer reassurance notes */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-gray-600 border-t border-gray-200/80">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-agri-700" />
                  <span>Integrated Pest Management (IPM)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-agri-700" />
                  <span>Marathi & Hindi vernacular</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-agri-700" />
                  <span>Safe biological bio-controls</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Realistic Agricultural Crop Diagnostic Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/90 relative">
                {/* Floating status tag */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Live Diagnosis Simulation
                    </span>
                  </div>
                  <Badge variant="critical" size="sm">High Severity</Badge>
                </div>

                {/* Hero Crop Specimen */}
                <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-100 aspect-4/3 flex items-center justify-center">
                  <img
                    src="/samples/cotton_bollworm.svg"
                    alt="Cotton bollworm specimen"
                    className="w-full h-full object-contain"
                  />
                  {/* Subtle focus targeting box */}
                  <div className="absolute inset-8 border border-agri-400/80 rounded-lg pointer-events-none flex items-start justify-end p-2">
                    <span className="text-[10px] font-mono bg-black/70 text-agri-300 px-1.5 py-0.5 rounded">
                      Confidence 94%
                    </span>
                  </div>
                </div>

                {/* Micro Diagnosis Result */}
                <div className="mt-4 p-3 bg-agri-50/70 rounded-xl border border-agri-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-agri-950">Cotton: Pink Bollworm Larva</span>
                    <span className="text-xs font-extrabold text-agri-800">94% Match</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    Immediate action: Install 8 pheromone sleeve traps/acre; evening spray of <em>Beauveria bassiana</em> bio-agent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Farmer Questions Section */}
      <section className="py-12 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-bold text-agri-700 uppercase tracking-widest mb-1">
              Built on First Principles
            </h2>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              The 4 Critical Questions Every Indian Farmer Needs Answered
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card padding="p-5" className="border-agri-200 bg-agri-50/30">
              <span className="text-xs font-bold text-agri-800 uppercase tracking-wide">Step 1</span>
              <h4 className="text-base font-bold text-gray-900 mt-1 mb-2">{t.fourQuestions.q1}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t.fourQuestions.q1Desc}</p>
            </Card>

            <Card padding="p-5" className="border-agri-200 bg-agri-50/30">
              <span className="text-xs font-bold text-agri-800 uppercase tracking-wide">Step 2</span>
              <h4 className="text-base font-bold text-gray-900 mt-1 mb-2">{t.fourQuestions.q2}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t.fourQuestions.q2Desc}</p>
            </Card>

            <Card padding="p-5" className="border-agri-200 bg-agri-50/30">
              <span className="text-xs font-bold text-agri-800 uppercase tracking-wide">Step 3</span>
              <h4 className="text-base font-bold text-gray-900 mt-1 mb-2">{t.fourQuestions.q3}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t.fourQuestions.q3Desc}</p>
            </Card>

            <Card padding="p-5" className="border-agri-200 bg-agri-50/30">
              <span className="text-xs font-bold text-agri-800 uppercase tracking-wide">Step 4</span>
              <h4 className="text-base font-bold text-gray-900 mt-1 mb-2">{t.fourQuestions.q4}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t.fourQuestions.q4Desc}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 1 — How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-[#FBFBFA] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-agri-700 uppercase tracking-widest mb-1">
              Simple 3-Step Process
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t.landing.howItWorksTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="p-6" className="text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-agri-100 text-agri-800 flex items-center justify-center mx-auto mb-4 border border-agri-200">
                <Camera className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{t.landing.step1Title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t.landing.step1Desc}</p>
            </Card>

            <Card padding="p-6" className="text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-agri-100 text-agri-800 flex items-center justify-center mx-auto mb-4 border border-agri-200">
                <SearchCheck className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{t.landing.step2Title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t.landing.step2Desc}</p>
            </Card>

            <Card padding="p-6" className="text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-agri-100 text-agri-800 flex items-center justify-center mx-auto mb-4 border border-agri-200">
                <Sprout className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{t.landing.step3Title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t.landing.step3Desc}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2 — Key Features */}
      <section id="features" className="py-16 sm:py-20 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-agri-700 uppercase tracking-widest mb-1">
              Full Feature Set
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t.landing.featuresTitle}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              {t.landing.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <Card key={feat.title} padding="p-5" hoverEffect={true}>
                  <div className="w-10 h-10 rounded-xl bg-agri-50 text-agri-800 flex items-center justify-center mb-3.5 border border-agri-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">{feat.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Why It Matters */}
      <section id="why-it-matters" className="py-16 sm:py-20 bg-[#FBFBFA] border-b border-gray-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-agri-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-agri-300">
                Agronomic Context
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t.landing.whyItMattersTitle}
              </h3>
              <div className="space-y-3 text-agri-100/90 text-sm sm:text-base leading-relaxed max-w-3xl pt-2">
                <p>{t.landing.whyItMattersText1}</p>
                <p>{t.landing.whyItMattersText2}</p>
                <p className="text-white font-medium">{t.landing.whyItMattersText3}</p>
              </div>

              <div className="pt-4">
                <Button
                  size="md"
                  onClick={() => navigate('/detect')}
                  className="bg-white text-agri-950 hover:bg-agri-100 font-bold shadow-md"
                >
                  Experience Detection Prototype
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Simple Process Visualization */}
      <section id="process" className="py-16 sm:py-20 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-agri-700 uppercase tracking-widest mb-1">
              End-To-End Journey
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t.landing.processTitle}
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            {[
              { label: t.landing.stepA, num: "1" },
              { label: t.landing.stepB, num: "2" },
              { label: t.landing.stepC, num: "3" },
              { label: t.landing.stepD, num: "4" },
              { label: t.landing.stepE, num: "5" }
            ].map((step, idx) => (
              <div key={idx} className="flex-1 text-center w-full">
                <div className="p-4 rounded-xl bg-agri-50 border border-agri-200 flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-agri-700 text-white flex items-center justify-center text-xs font-bold mb-2 shadow-2xs">
                    {step.num}
                  </span>
                  <p className="text-xs font-semibold text-gray-900">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Bottom CTA */}
      <section className="py-16 sm:py-20 bg-agri-50/60 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {t.landing.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            {t.landing.ctaSubtitle}
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => navigate('/detect')}
              className="bg-agri-800 hover:bg-agri-900 text-white font-bold px-8 shadow-sm"
            >
              {t.landing.ctaBtn}
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};
