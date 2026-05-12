export default function Marquee() {
  const marqueeText =
    "React · Next.js · TypeScript · Tailwind CSS · Web Development · Node.js · PHP · Laravel · REST APIs · SQL · Eloquent ORM · Backend Development · Shopify · Shopify Theme Development · Blade Templates · MVC Architecture · ";

  return (
    <section className="relative w-full py-12 bg-transparent overflow-hidden border-y border-divider">
      <div className="flex gap-4 whitespace-nowrap">
        {/* First loop */}
        <div
          className="marquee text-sm font-mono text-muted uppercase tracking-wider"
          style={{ "--duration": "30s" } as React.CSSProperties}
        >
          {marqueeText}
        </div>

        {/* Second loop for seamless effect */}
        <div
          className="marquee text-sm font-mono text-muted uppercase tracking-wider"
          style={{ "--duration": "30s" } as React.CSSProperties}
          aria-hidden="true"
        >
          {marqueeText}
        </div>
      </div>
    </section>
  );
}
