import React from 'react';
import { BiryaniIntelMetrics } from '../types/biryani';

interface RadarChartProps {
  metrics: BiryaniIntelMetrics;
  restaurantName: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ metrics, restaurantName }) => {
  const axes = [
    { key: 'distanceImpact', label: 'Thandah Na Ho Jaye (Distance)', value: metrics.distanceImpact, description: 'Temperature & speed penalty index' },
    { key: 'publicOpinion', label: 'Public Opinion (Ratings)', value: metrics.publicOpinion, description: 'Aggregated food enthusiast consensus' },
    { key: 'yaarDostLove', label: 'Yaar-Dost Factor (Group)', value: metrics.yaarDostLove, description: 'War room internal vote chemistry' },
    { key: 'botiRatio', label: 'Boti-to-Rice Balance', value: metrics.botiRatio, description: 'Succulent meat piece distribution' },
    { key: 'dumIntegrity', label: 'Dum & Saffron Aroma', value: metrics.dumIntegrity, description: 'Sealed clay pot fragrance retention' }
  ];

  const size = 300;
  const center = size / 2;
  const radius = 105;
  const totalAxes = axes.length;

  // Calculate polygon points
  const points = axes.map((axis, i) => {
    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
    const r = (axis.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, label: axis.label, value: axis.value };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="bg-[#181818] border border-[#333333] rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#2A2A2A] gap-2">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-semibold">
            TACTICAL INTEL MATRIX
          </span>
          <h4 className="text-base font-bold text-white tracking-tight">
            5-Axis Dum Diagnostics: {restaurantName}
          </h4>
        </div>
        <div className="text-xs font-mono bg-[#242424] px-2.5 py-1 rounded text-zinc-300 border border-[#3A3A3A]">
          ALGORITHM: WBS-v4.2
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mt-3">
        {/* Radar Graphic */}
        <div className="md:col-span-7 flex justify-center py-2 relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            {/* Background concentric rings */}
            {gridLevels.map((lvl, index) => {
              const ringPoints = axes.map((_, i) => {
                const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                const r = lvl * radius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              }).join(' ');

              return (
                <polygon
                  key={index}
                  points={ringPoints}
                  fill={index === 3 ? '#222222' : 'none'}
                  fillOpacity={0.4}
                  stroke="#3A3A3A"
                  strokeWidth="1"
                  strokeDasharray={index === 3 ? 'none' : '3,3'}
                />
              );
            })}

            {/* Axis spokes */}
            {axes.map((_, i) => {
              const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="#444444"
                  strokeWidth="1"
                />
              );
            })}

            {/* Data Polygon */}
            <polygon
              points={polygonPath}
              fill="rgba(255, 153, 51, 0.28)"
              stroke="#FF9933"
              strokeWidth="2.5"
              className="transition-all duration-500 ease-out"
            />

            {/* Data Vertex Dots */}
            {points.map((p, idx) => (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill="#FF9933"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="8"
                  fill="none"
                  stroke="#FF9933"
                  strokeWidth="1"
                  opacity="0.5"
                  className="animate-ping"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Legend & Breakdown values */}
        <div className="md:col-span-5 space-y-2.5">
          {axes.map((axis, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-[#202020] border border-[#2D2D2D] hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-200">{axis.label}</span>
                <span className="font-mono font-bold text-amber-400 tabular-nums">
                  {axis.value}%
                </span>
              </div>
              <div className="w-full bg-[#141414] h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${axis.value}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-500 mt-1 leading-tight">
                {axis.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
