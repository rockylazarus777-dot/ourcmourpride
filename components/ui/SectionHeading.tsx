import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  titleHighlight,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {label && (
        <p className="text-primary font-poppins font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="font-poppins font-black text-2xl md:text-3xl lg:text-4xl text-navy leading-tight">
        {title}
        {titleHighlight && (
          <>
            {" "}
            <span className="text-primary">{titleHighlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-navy/60 font-inter leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
