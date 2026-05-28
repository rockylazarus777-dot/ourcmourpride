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
    <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-40 w-[min(1100px,92%)]">
      <div className="bg-navy/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl px-4 py-3 flex items-center justify-between gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="flex items-center gap-4 px-3 py-2 min-w-[170px]">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shadow-md">
                <Icon size={20} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{s.label.split(':')[0]}</div>
                <div className="text-xs opacity-80">{s.label.includes(":") ? s.label.split(":")[1].trim() : ''}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
