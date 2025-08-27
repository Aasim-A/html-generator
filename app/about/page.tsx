// About Page Component
const AboutPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100'>About</h1>

        <div className='rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                Student Information
              </h2>
              <div className='space-y-3'>
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Name:
                  </label>
                  <p className='text-lg text-gray-900 dark:text-gray-100'>Aasim Al-Mashhadani</p>
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Student Number:
                  </label>
                  <p className='text-lg text-gray-900 dark:text-gray-100'>21987364</p>
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Subject:
                  </label>
                  <p className='text-lg text-gray-900 dark:text-gray-100'>CSE3CWA</p>
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Assignment:
                  </label>
                  <p className='text-lg text-gray-900 dark:text-gray-100'>
                    Assignment 1 - NextJS Web Application
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                How to Use This Website
              </h2>
              <div className='space-y-4'>
                <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
                  <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
                    Website Usage Guide
                  </h3>
                  <ol className='list-inside list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300'>
                    <li>Navigate to the Home page to access the HTML code generators.</li>
                    <li>Configure your tabs by adding tab names and content.</li>
                    <li>Click &quot;Generate HTML Code&quot; to create the HTML + JS output.</li>
                    <li>Copy the generated code and save it as an HTML file.</li>
                    <li>The generated code includes inline CSS and JavaScript.</li>
                    <li>Test the code by opening the HTML file in any web browser.</li>
                    <li>The website remembers your last visited section using local storage.</li>
                    <li>Switch between dark/light mode using the theme toggle in the header.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 border-t border-gray-200 pt-8 dark:border-gray-700'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
              Project Description
            </h2>
            <p className='leading-relaxed text-gray-600 dark:text-gray-300'>
              This Next.js application is designed to generate HTML5 + JavaScript code suitable for
              deployment on MOODLE LMS. The application focuses on creating interactive components
              like tabs, accordions, modals, and other HTML5 elements with inline styling and
              JavaScript functionality. The generated code is self-contained and can be directly
              copied into MOODLE without external dependencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
