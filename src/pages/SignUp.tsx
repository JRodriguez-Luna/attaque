import { useNavigate } from 'react-router';
import { Input } from '../components/Input.tsx'

export const SignUp = () => {
  let navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);

      const response = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      navigate('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      action={handleSubmit}
      className='flex justify-center items-center bg-panel h-dvh'
    >
      {/* Video portion for 1024px and over - Desktop */}
      <div className='max-xl:hidden flex flex-1 h-auto'>
        <div className='h-dvh relative p-5'>
          <video
            className='object-cover w-full h-full rounded-4xl'
            autoPlay
            loop
            muted
            src='/cycling_video.mp4'
          />
          <div className='absolute z-50 left-10 bottom-10 w-19.5 h-auto'>
            <img
              className='w-full h-full'
              src='/attaque-lime.png'
              alt='attaque-logo'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col w-5/6 xl:w-1/4 lg:m-5 p-5 gap-5 text-white'>
        <div className='flex justify-center items-center px-6 py-7'>
          <img
            className='h-auto w-14'
            src='/attaque-lime.png'
            alt='attaque logo'
          />
          <span className='text-4xl font-semibold text-white'>ttaque</span>
        </div>

        {/* title */}
        <h1 className='text-5xl text-lime font-semibold'>Sign up</h1>
        {/* Motto */}
        <p className='text-start text-lg text-muted'>
          Sign up today and enjoy all features of Attaque
        </p>

        {/* Full Name */}
        <Input name='full_name' type='text' placeholder="John Doe" className='w-full' required/>

        {/* Username */}
        <Input name="username" type="text" placeholder="john.doe8" className="w-full" required/>

        {/* Email */}
        <Input name="email" type="email" placeholder="john.doe@example.com" className="w-full" required/>

        {/* Password */}
        <Input name='password' type='password' placeholder="********" className='w-full' required/>

        <button
          className='flex w-full justify-center text-black font-semibold text-lg border bg-lime hover:bg-slight-lime rounded-xl p-4 cursor-pointer'
          type='submit'
        >
          Sign up
        </button>

        {/* Navigate to Sign Up */}
        <button
          type="button"
          onClick={() => navigate('/sign-in')}
          className='text-muted cursor-pointer'
        >
          Already have an account?{' '}
          <span className='text-lime hover:text-slight-lime underline'>
            Sign in!
          </span>
        </button>

        {/* Google Login - Soon */}
      </div>
    </form>
  );
};
