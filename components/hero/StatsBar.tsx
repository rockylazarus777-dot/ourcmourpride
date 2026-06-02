import React from "react";
import { BarChart, Users, Globe, Star } from "lucide-react";

const stats = [
  { label: "2.5 Cr+ People Benefited", icon: Users },
  { label: "1000+ Development Projects", icon: BarChart },
  { label: "50+ Welfare Schemes", icon: Globe },
  { label: "1 Vision: Better Tomorrow", icon: Star },
];

export default function StatsBar() {
  return (
    /* Sits just outside the hero bottom — floats without covering any hero content */
    <div className="relative z-20 w-full -mt-14 md:-mt-20 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-5xl bg-navy/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl px-4 py-3 grid grid-cols-2 lg:grid-cols-4 gap-0">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 px-4 py-4 ${
                idx < stats.length - 1 ? "border-b lg:border-b-0 lg:border-r border-white/10" : ""
              } ${idx % 2 === 0 && idx < stats.length - 1 ? "border-r lg:border-r-0" : ""}`}
            >
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shadow-md flex-shrink-0">
                <Icon size={20} />
              </div>
              <div className="text-left min-w-0">
                <div className="text-sm font-bold leading-tight truncate">{s.label.split(':')[0]}</div>
                <div className="text-xs opacity-70 leading-tight">{s.label.includes(":") ? s.label.split(":")[1].trim() : ''}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
