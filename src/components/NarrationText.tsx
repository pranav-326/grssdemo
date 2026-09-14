"use client";

import React, { useEffect, useState, useRef } from "react";

interface NarrationTypingProps {
  text: string;
  className?: string;
  speed?: number; // ms per char
  delay?: number; // initial delay ms
  showCursor?: boolean;
  onComplete?: () => void;
  as?: React.ElementType;
}

/**
 * Character-by-character left-to-right typing effect with gentle editorial cadence.
 * Hydration-safe: renders full text during SSR/initial mount so content NEVER flashes empty or mismatches.
 */
export const NarrationTyping: React.FC<NarrationTypingProps> = ({
  text,
  className = "",
  speed = 32,
  delay = 0,
  showCursor = true,
  onComplete,
  as: Component = "span",
}) => {
  const [mounted, setMounted] = useState(false);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          timer = setTimeout(() => {
            setIsStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [mounted, delay]);

  useEffect(() => {
    if (!isStarted || displayedLength >= text.length) {
      if (displayedLength >= text.length && !isDone) {
        setIsDone(true);
        if (onComplete) onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isStarted, displayedLength, text.length, speed, isDone, onComplete]);

  // SSR / pre-hydration render: full text visible immediately. No layout shifts, no blank flash.
  if (!mounted) {
    return (
      <Component ref={containerRef} className={className}>
        {text}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span>{text.slice(0, displayedLength)}</span>
        {/* Editorial typing cursor */}
        {showCursor && !isDone && isStarted && (
          <span className="inline-block ml-0.5 w-[2px] h-[0.85em] bg-olive animate-pulse align-middle" />
        )}
        {/* Hidden text placeholder to guarantee zero layout shifts */}
        <span className="opacity-0 select-none pointer-events-none">
          {text.slice(displayedLength)}
        </span>
      </span>
    </Component>
  );
};

interface NarrationWordsProps {
  text: string;
  className?: string;
  staggerMs?: number; // ms delay between each word
  delay?: number; // initial delay ms
  as?: React.ElementType;
}

/**
 * Word-by-word left-to-right soft fade & glide in animation.
 * Defaults to 'span' to avoid invalid HTML nesting (e.g. <p> inside <p>).
 * SSR-safe: renders full text upfront so content never vanishes.
 */
export const NarrationWords: React.FC<NarrationWordsProps> = ({
  text,
  className = "",
  staggerMs = 30,
  delay = 0,
  as: Component = "span",
}) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const words = text.split(" ");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [mounted, delay]);

  // SSR / pre-hydration: render standard text so no blank flash or hydration mismatch occurs
  if (!mounted) {
    return (
      <Component ref={containerRef} className={className}>
        {text}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={className}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0.15,
            transform: isVisible ? "translateX(0)" : "translateX(-6px)",
            filter: isVisible ? "blur(0px)" : "blur(1.5px)",
            transitionDelay: `${idx * staggerMs}ms`,
            marginRight: idx === words.length - 1 ? "0" : "0.26em",
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
};

interface NarrationLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

/**
 * Smooth left-to-right fade & slight glide for inline text blocks or lines.
 * Does NOT clip or hide content completely.
 */
export const NarrationLine: React.FC<NarrationLineProps> = ({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [mounted, delay]);

  if (!mounted) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0.25,
        transform: isVisible ? "translateX(0)" : "translateX(-8px)",
      }}
    >
      {children}
    </Component>
  );
};
