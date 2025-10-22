export default function Congrats() {
  return (
    <div>
      <h2 className='mb-4 text-center text-2xl font-semibold text-gray-900 dark:text-gray-100'>
        Congratulations
      </h2>
      <div className='space-y-4'>
        <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
            You have escaped successfully within the given time!
          </h3>
        </div>
      </div>
    </div>
  );
}
