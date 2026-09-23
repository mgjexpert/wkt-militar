"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
];

export function OfferCta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [href, setHref] = useState("/checkout?src=oferta");

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);
    const checkout = new URLSearchParams({ src: "oferta" });

    for (const key of TRACKING_KEYS) {
      const value = current.get(key);
      if (value) checkout.set(key, value);
    }

    setHref(`/checkout?${checkout.toString()}`);
  }, []);

  return <Link href={href} className={className}>{children}</Link>;
}
