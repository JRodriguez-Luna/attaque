export type Ride = {
  id: number;
  title: string;
  description: string;
  distance: string;
  avg_speed: string;
  avg_power: number;
  duration_seconds: number | null;
  elevation_gain: number | null;
  ride_type: 'Road' | 'Gravel' | 'Indoor' | null;
  xp_earned: number | null;
  ride_date: string;
  created_at: string;
};
