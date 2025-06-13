"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { useState, useRef } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const form = useRef();

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      await emailjs.sendForm(
        'service_ojnl3hz', // Service ID
        'template_8t8tzpp', // Template ID
        form.current,
        'XqRL8RMPOcN0pkmjs' // Public Key
      );
      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">{"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}</p>
        <div className="mt-6 flex flex-col gap-4">
          <form ref={form} onSubmit={handleSendMail} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base">Your Name: </label>
              <input
                className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                type="text"
                maxLength="100"
                required={true}
                name="user_name"
                onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
                onBlur={checkRequired}
                value={userInput.name}
                suppressHydrationWarning
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base">Your Email: </label>
              <input
                className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                type="email"
                maxLength="100"
                required={true}
                name="user_email"
                value={userInput.email}
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
                suppressHydrationWarning
              />
              {error.email && <p className="text-sm text-red-400">Please provide a valid email!</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base">Your Message: </label>
              <textarea
                className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                maxLength="500"
                name="message"
                required={true}
                onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
                onBlur={checkRequired}
                rows="4"
                value={userInput.message}
                suppressHydrationWarning
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              {error.required && <p className="text-sm text-red-400">
                All fiels are required!
              </p>}
              <button
                className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
                role="button"
                type="submit"
                disabled={isLoading}
                suppressHydrationWarning
              >
                {
                  isLoading ?
                  <span>Sending Message...</span>:
                  <span className="flex items-center gap-1">
                    Send Message
                    <TbMailForward size={20} />
                  </span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;