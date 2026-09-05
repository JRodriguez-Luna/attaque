

export const RideRow = () => {
  return (
    <div className='flex flex-col items-center gap-3 text-lg border-b border-b-gray-600 p-2'>
      <div className='flex w-full gap-5'>
        {/* Date */}
        <div className='flex flex-col items-center'>
          <span className='font-semibold'>27</span>
          <h5 className='text-sm font-extralight'>AUG</h5>
        </div>

        {/* title and Mini Description */}
        <div className='flex flex-col'>
          <h5 className='font-semibold'>Lets GOOOOOO</h5>
          <span className='flex text-slight-purple font-extralight text-sm gap-5'>
            {/* type */}
            <span>Road</span>
            {/* time */}
            <span>03h 44m</span>
            {/* avg. speed */}
            <span>avg. 18.7mph</span>
          </span>
        </div>
      </div>

      {/* Data */}
      <div className='flex w-full justify-between items-center'>

        {/* Miles - mi */}
        <p className='font-extralight'>
          62
          <span className='text-slight-purple font-semibold'>mi</span>
        </p>

        {/* Elevation - ft */}
        <p className='font-extralight'>
          1204
          <span className='text-slight-purple font-semibold'>ft</span>
        </p>

        {/* Power - w */}
        <p className='font-extralight'>
          192
          <span className='text-slight-purple font-semibold'>w</span>
        </p>
      </div>
    </div>
  );
}