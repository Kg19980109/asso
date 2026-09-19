import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FadeIn, FadeInStagger } from "@/components/animations/fade-in";
import {
  Layers,
  Palette,
  Clock,
  Sparkles,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  UtensilsCrossed,
  Flame,
} from "lucide-react";
import Link from "next/link";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen py-16 text-stone-900 bg-[#FFFCF5]">
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-12 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-black tracking-wider text-stone-900">ASSO</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-300 font-bold">
                Light &amp; Vibrant Design System
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
              Design System &amp; Token Lab
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Component playground for typography, color tokens, interactive states, and responsive cards.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-bold px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 transition-colors shadow-xs w-fit"
          >
            ← Back to Home
          </Link>
        </div>

        <FadeInStagger className="space-y-16">
          {/* Section 1: Color Palette */}
          <Section spacing="sm">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-600" />
              <span>1. Color Token Palette</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-[#FFFCF5] p-4 rounded-2xl border border-stone-200 flex flex-col justify-between h-28 shadow-xs">
                <span className="text-xs text-stone-500 font-mono">#FFFCF5</span>
                <span className="text-xs font-bold text-stone-900">Warm Cream Base</span>
              </div>
              <div className="bg-orange-500 p-4 rounded-2xl text-white flex flex-col justify-between h-28 shadow-lg shadow-orange-500/20">
                <span className="text-xs font-mono font-bold">#F97316</span>
                <span className="text-xs font-bold">Puja Saffron</span>
              </div>
              <div className="bg-amber-400 p-4 rounded-2xl text-amber-950 flex flex-col justify-between h-28 shadow-lg shadow-amber-400/20">
                <span className="text-xs font-mono font-bold">#FBBF24</span>
                <span className="text-xs font-bold">Marigold Gold</span>
              </div>
              <div className="bg-teal-500 p-4 rounded-2xl text-white flex flex-col justify-between h-28 shadow-lg shadow-teal-500/20">
                <span className="text-xs font-mono font-bold">#14B8A6</span>
                <span className="text-xs font-bold">Electric Teal</span>
              </div>
              <div className="bg-purple-600 p-4 rounded-2xl text-white flex flex-col justify-between h-28 shadow-lg shadow-purple-500/20">
                <span className="text-xs font-mono font-bold">#9333EA</span>
                <span className="text-xs font-bold">Royal Purple</span>
              </div>
              <div className="bg-rose-500 p-4 rounded-2xl text-white flex flex-col justify-between h-28 shadow-lg shadow-rose-500/20">
                <span className="text-xs font-mono font-bold">#F43F5E</span>
                <span className="text-xs font-bold">Festive Rose</span>
              </div>
            </div>
          </Section>

          {/* Section 2: Typography */}
          <Section spacing="sm">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>2. Typography Scale (Outfit + Hind Siliguri)</span>
            </h2>
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-200 shadow-md">
              <div className="space-y-1">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-mono">Display</span>
                <h1 className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight">
                  <span className="gradient-text-saffron font-sans">ASSO — আসো</span>
                </h1>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-mono">Heading 1</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
                  More Puja. Less Waiting.
                </h1>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-mono">Heading 2</span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-stone-800">
                  Smart Virtual Queues for Kolkata Dining
                </h2>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-mono">Body &amp; Bengali Pairing</span>
                <p className="text-base text-stone-600 leading-relaxed max-w-3xl">
                  ASSO helps food lovers join live queues and receive real-time table notifications seamlessly during festive crowds and peak dining hours.
                  <span className="block mt-1 font-bengali text-orange-700 font-bold text-lg">
                    পুজোর ভিড়ে রেস্তোরাঁর লাইনে আর অপেক্ষা নয় — আসো অ্যাপে আগে থেকেই টেবিল বুক ও ট্র্যাকিং করুন।
                  </span>
                </p>
              </div>
            </div>
          </Section>

          {/* Section 3: Buttons */}
          <Section spacing="sm">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>3. Interactive Buttons</span>
            </h2>
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-200 shadow-md">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="saffron" size="lg">
                  <Flame className="w-4 h-4" />
                  <span>Saffron Primary (Large)</span>
                </Button>
                <Button variant="gold" size="md">
                  <span>Gold Button (Medium)</span>
                </Button>
                <Button variant="teal" size="sm">
                  <span>Teal Button (Small)</span>
                </Button>
                <Button variant="outline" size="md">
                  <span>Outline Button</span>
                </Button>
                <Button variant="secondary" size="md">
                  <span>Secondary Surface</span>
                </Button>
                <Button variant="saffron" size="md" disabled>
                  <span>Disabled State</span>
                </Button>
              </div>
            </div>
          </Section>

          {/* Section 4: Badges */}
          <Section spacing="sm">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>4. Badges &amp; Status Indicators</span>
            </h2>
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-wrap gap-3 border border-stone-200 shadow-md">
              <Badge variant="saffron">
                <Sparkles className="w-3 h-3 text-orange-600" />
                <span>Saffron Badge</span>
              </Badge>
              <Badge variant="gold">
                <span>Marigold Gold</span>
              </Badge>
              <Badge variant="teal">
                <span>Teal Badge</span>
              </Badge>
              <Badge variant="purple">
                <span>Royal Purple</span>
              </Badge>
              <Badge variant="emerald">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Queue Active</span>
              </Badge>
              <Badge variant="rose">
                <span>Rose Accent</span>
              </Badge>
              <Badge variant="neutral">
                <span>Neutral Border</span>
              </Badge>
            </div>
          </Section>

          {/* Section 5: Cards */}
          <Section spacing="sm">
            <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>5. Cards &amp; Surface Elevation</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="saffron">
                <CardHeader>
                  <CardTitle>Saffron Festive Card</CardTitle>
                  <CardDescription>
                    Warm gradient card for highlights and promotional banners.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-stone-600">
                    Warm amber border with subtle orange ambient glow.
                  </p>
                </CardContent>
              </Card>

              <Card variant="teal">
                <CardHeader>
                  <CardTitle>Teal Solution Card</CardTitle>
                  <CardDescription>
                    Clean fresh pastel card for guest journey highlights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-stone-600">
                    Crisp teal border with soft teal shadow.
                  </p>
                </CardContent>
              </Card>

              <Card variant="purple">
                <CardHeader>
                  <CardTitle>Purple Restaurant Card</CardTitle>
                  <CardDescription>
                    Dedicated host dashboard and partner features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-stone-600">
                    Lavender pastel background with royal purple accents.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>
        </FadeInStagger>
      </Container>
    </main>
  );
}
