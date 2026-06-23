"use client";

import { Button } from "@heroui/react";
import { Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Get started with basic access.",
      features: ["3 Artworks purchase limit", "Basic community access", "Email support"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "For active collectors and art lovers.",
      features: ["9 Artworks purchase limit", "Priority support", "Early access to sales", "Exclusive badge"],
      popular: true,
      priceId: "price_1Tkg5T3fBkSUmSNEJYbhl9ux", 
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/month",
      description: "For serious art enthusiasts.",
      features: ["Unlimited purchases", "Dedicated manager", "Custom profile view", "24/7 Priority support"],
      popular: false,
      priceId: "price_1TkgIb3fBkSUmSNE2BKueqkS",
    },
  ];

  const handleSubscribe = async (priceId) => {
    if (!priceId) return;

    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        body: JSON.stringify({ priceId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.url) {
       
        window.location.assign(data.url);
      } else if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0e17] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Upgrade Your Experience</h1>
          <p className="mt-4 text-gray-400">Choose a plan that fits your collecting needs.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 transition-all hover:shadow-2xl ${
                plan.popular 
                ? "border-pink-500 bg-[#131722] ring-2 ring-pink-500/20" 
                : "border-gray-800 bg-[#0f131f]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-pink-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-3 text-gray-400">{plan.description}</p>

              <div className="mt-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-5 w-5 shrink-0 text-pink-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button className="mt-8 w-full bg-gray-800 text-white cursor-not-allowed" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button
                  onPress={() => handleSubscribe(plan.priceId)}
                  className={`mt-8 w-full font-medium ${
                    plan.popular ? "bg-pink-600 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  Upgrade
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}