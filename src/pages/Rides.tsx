import { useEffect, useState } from 'react';
import { AddLogForm } from '../components/AddLogForm';
import { type Ride } from '../types';
import { Modal } from './Modal';
import { Logo } from '../components/Logo';
import { WeeklyChart } from '../components/Rides/WeeklyChart';
import { RideRow } from '../components/Rides/RideRow';
import { startOfWeek, formatWeekRange } from '../lib/date';

export const Rides = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Add a new ride
  const handleAddRide = (newRide: Ride) => {
    setRides([...rides, newRide]);
    setIsOpen(false); //  This will close the modal after submit the new ride
  };

  // Close Modal
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        // get token from user
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:3000/api/rides', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // if not ok, throw error
        if (!res.ok) {
          throw new Error(`Response Status: ${res.status}`);
        }

        const result = await res.json();

        setRides(result);
      } catch (err) {
        console.error('Message:', err);
      }
    };

    fetchRides();
  }, []);

  // Get total miles
  let totalMiles: number = 0;
  rides.forEach((r) => {
    totalMiles += Number(r.distance)
  })

  return (
    // Main Section of Content
    <main className='flex flex-col gap-5 p-5 w-full'>
      <div className='flex justify-center'>
        <Logo />
      </div>

      {/* Header */}
      <h1 className='text-3xl text-white font-semibold'>Rides</h1>

      {/* Description + Add Button */}
      <div className='flex justify-between items-center'>
        {/* Grouped Description */}
        <div className='flex flex-col text-lime'>
          <p  className="text-base">{rides.length} rides</p>
          <p className="text-base">{totalMiles} miles</p>
        </div>

        {/* Add log Button -  */}
        <button
          className='flex bg-lime items-center rounded-xl px-5 py-2 h-min'
          type='button'
          onClick={() => setIsOpen(true)}
        >
          Add Log
        </button>
      </div>

      {/* Chart Streak */}
      <div className='flex flex-col w-full bg-slight-purple/40 font-semibold text-slight-purple  rounded-2xl gap-5 p-3'>
        {/* title + data display */}
        <div className='flex justify-between'>
          {/* Currently week */}
          <p>{formatWeekRange(startOfWeek())}</p>

          {/* Detaisl - this will swap with the hover affect later. */}
          <p>Hover a day to see details</p>
        </div>

        {/* Weekly Chart Component - chart.js */}
        <WeeklyChart rides={rides} />
      </div>

      {/* Recent rides */}
      <div className='flex w-full flex-col gap-5 text-white'>
        <h4 className='text-lg'>Recent Rides</h4>

        {/* Data - RideRow - Limit 4 then View All button */}
        {rides.slice(0,4).map((ride) => (
          <RideRow key={ride.id} ride={ride} />
        ))}

        {/* View All */}
        <button type='button' className='text-lime underline'>
          View All
        </button>
      </div>

      {/* Form Module */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <AddLogForm onAddRide={handleAddRide} />
      </Modal>
    </main>
  );
};
