import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
function ContactForm() {
  const [state, handleSubmit] = useForm("xoqodzvb");
  if (state.succeeded) {
      return <p>Thanks for Contacting. We will reach out to you soon!!!</p>;
  }
  return (
      <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="full-name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 peer inbut-border" placeholder=" " required />
                        <label for="full-name" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                      <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white peer inbut-border" placeholder=" " required />
                      <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                  </div>
           
                  

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="tel" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  peer inbut-border" placeholder=" " required />
                        <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile number (+92 0123456789)</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <label for="countries" className="block mb-2 text-sm font-medium text-black dark:text-white" required>Event</label>
                        <select id="options" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white inbut-border" required>
                          <option>Wedding</option>
                          <option>Engagement</option>
                          <option>Birthday</option>
                          <option>Other</option>
                        </select>
                      </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your message</label>
                            <textarea id="message" name="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   inbut-border" placeholder="Leave a comment..." required></textarea>

                  </div>
      <button type="submit" className='btn-grad' disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}
function App() {
  return (
    <ContactForm />
  );
}
export default App;
