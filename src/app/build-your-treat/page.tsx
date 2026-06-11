import React from "react";
import BuildYourTreatClient from "./BuildYourTreatClient";

export const metadata = {
  title: "Build Your Custom Treat - Shaytee's Treat",
  description: "Customize your dessert! Choose ice cream flavors, cup sizes, premium toppings, free drizzles, and snacks, and order directly to WhatsApp.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BuildYourTreat({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const getParamString = (val: string | string[] | undefined): string | undefined => {
    if (Array.isArray(val)) {
      return val[0];
    }
    return val;
  };

  const initialSearchParams = {
    flavor: getParamString(resolvedParams.flavor),
    size: getParamString(resolvedParams.size),
    toppings: getParamString(resolvedParams.toppings),
    drizzle: getParamString(resolvedParams.drizzle),
    extras: getParamString(resolvedParams.extras),
  };

  return <BuildYourTreatClient initialSearchParams={initialSearchParams} />;
}
