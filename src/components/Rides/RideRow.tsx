import type { Ride } from '../../types';

type RideRowProps = {
  ride: Ride;
};

const getDay = (day: string) => {
  return new Date(day).getDate();
};

const getMonth = (month: string) => {
  return new Date(month).toLocaleDateString('default', { month: 'short' });
};

export const RideRow = ({ ride }: RideRowProps) => {
  let hours;
  let minutes;

  if (ride.duration_seconds) {
    hours = Math.floor(ride.duration_seconds / 3600);
    minutes = (ride.duration_seconds % 3600) / 60;
  }

  return (
    <div className='flex flex-col items-center gap-3 text-lg border-b border-b-border p-2'>
      <div className='flex w-full gap-5'>
        {/* Date */}
        <div className='flex flex-col items-center'>
          {/* day */}
          <span className='font-semibold'>{getDay(ride.ride_date)}</span>
          {/* month */}
          <h5 className='text-sm font-extralight'>
            {getMonth(ride.ride_date)}
          </h5>
        </div>

        {/* title and Mini Description */}
        <div className='flex flex-col'>
          <h5 className='font-semibold'>{ride.title}</h5>
          <span className='flex text-slight-purple font-extralight text-sm gap-5'>
            {/* type */}
            <span>{ride.ride_type}</span>
            {/* time */}
            <span>{`${hours}h ${minutes}m`}</span>
            {/* avg. speed */}
            <span>{ride.avg_speed}mph</span>
          </span>
        </div>
      </div>

      {/* Data */}
      <div className='flex w-full justify-between items-center'>
        {/* Miles - mi */}
        <p className='font-extralight'>
          {ride.distance}
          <span className='text-slight-purple font-semibold'>mi</span>
        </p>

        {/* Elevation - ft */}
        <p className='font-extralight'>
          {ride.elevation_gain}
          <span className='text-slight-purple font-semibold'>ft</span>
        </p>

        {/* Power - w */}
        <p className='font-extralight'>
          {ride.avg_power}
          <span className='text-slight-purple font-semibold'>w</span>
        </p>
      </div>
    </div>
  );
};
