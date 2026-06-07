"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

type RevealSectionProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function RevealSection({
  children,
  className = "",
  delay = 0,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`settle-reveal ${className}`.trim()}
      data-visible={visible}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
