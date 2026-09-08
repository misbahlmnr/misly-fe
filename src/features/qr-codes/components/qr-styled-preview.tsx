"use client";

import { useEffect, useRef } from "react";

import {
  buildQrOptions,
  createQrInstance,
} from "@/features/qr-codes/lib/qr-styling";
import type { QrStyles } from "@/features/qr-codes/schema";
import { cn } from "@/lib/utils";

type QrStyledPreviewProps = {
  data: string;
  styles?: QrStyles | null;
  logoUrl?: string | null;
  size?: number;
  className?: string;
};

export function QrStyledPreview({
  data,
  styles,
  logoUrl,
  size = 220,
  className,
}: QrStyledPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<Awaited<ReturnType<typeof createQrInstance>> | null>(
    null,
  );
  const stylesKey = JSON.stringify(styles ?? {});

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      if (!containerRef.current) return;

      const parsedStyles = JSON.parse(stylesKey) as QrStyles;
      const options = buildQrOptions(data, parsedStyles, logoUrl, size);

      if (!qrRef.current) {
        const qr = await createQrInstance(data, parsedStyles, logoUrl, size);
        if (cancelled || !containerRef.current) return;
        containerRef.current.replaceChildren();
        qr.append(containerRef.current);
        qrRef.current = qr;
        return;
      }

      qrRef.current.update(options);
    }

    void mount();

    return () => {
      cancelled = true;
    };
  }, [data, logoUrl, size, stylesKey]);

  useEffect(() => {
    const container = containerRef.current;

    return () => {
      qrRef.current = null;
      container?.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center", className)}
      aria-hidden
    />
  );
}
