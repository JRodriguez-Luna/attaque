import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import type { Ride } from '../types';

export const WeeklyChart = ({ rides }: { rides: Ride[] }) => {
  // Chart Props/config
  const ref = useRef<HTMLCanvasElement>(null);

  // useEffect Chart
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, {
      type: 'bar',
      // Data from user
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: '',
            data: [10, 20, 0, 60, 23, 0, 0],
            backgroundColor: [
              '#3D2464',
              '#3D2464',
              '#3D2464',
              '#3D2464',
              '#3D2464',
              '#3D2464',
              '#3D2464',
            ],
          },
        ],
      },
      // Modify Chart text and others
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          // Modified Hover box
          tooltip: {
            displayColors: false,
            backgroundColor: '#1A0B2E',
            titleColor: '#fff',
            bodyColor: '#A99BC4',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const miles = ctx.parsed.x;
                return [`${miles} mi`, `3h 12m`, '192 W'];
              },
            },
          },
        },
        // X and Y Axis modification
        scales: {
          x: {
            ticks: { color: '#B6AED4' },
            grid: { display: false },
            border: { display: false },
            display: false,
          },
          y: {
            ticks: { color: '#B6AED4' },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [rides]);

  return (
    // Bar chart / Mon - Sun
    <div>
      <canvas ref={ref} />
    </div>
  );
};
