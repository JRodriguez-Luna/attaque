import { useNavigate } from 'react-router';
import type { Ride } from '../types';
import { Input } from './Input';
useNavigate;

type AddLogFormProps = {
  onAddRide: (newRide: Ride) => void;
};

export const AddLogForm = ({ onAddRide }: AddLogFormProps) => {
  let navigate = useNavigate();

  const handleActionSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);
      const token = localStorage.getItem('token');

      if (!token) navigate('/sign-in');

      // Post ride with authorization token
      // ** Authorization needed else when submitting, it will error.
      const response = await fetch('http://localhost:3000/api/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const newRide = await response.json();
      onAddRide(newRide);
    } catch (error) {
      console.error('message', error);
    }
  };

  return (
    <form
      action={handleActionSubmit}
      className='flex flex-col gap-5 bg-active text-white'
    >
      <h2 className='text-2xl font-semibold'>Add Log</h2>
      {/* title */}
      <Input className='border' name='title' type='text' />

      {/* description --- FIX */}
      <Input className='border' name='description' type='textarea' />

      {/* distance */}
      <Input className='border' name='distance' type='text' />

      {/* avg_speed */}
      <Input className='border' name='avg_speed' type='text' />

      {/* avg_power */}
      <Input className='border' name='avg_power' type='number' />

      {/* ride_date */}
      <Input className='border' name='ride_date' type='date' />

      {/* Submit Button */}
      <button
        className='cursor-pointer p-4 rounded-xl text-active bg-lime'
        type='submit'
      >
        Save
      </button>
    </form>
  );
};
