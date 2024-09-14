import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sozx2hh",
        "template_ojyw21o",
        formRef.current!,
        "N1PcP4SOx8pv5A-OA"
      )
      .then(
        () => {
          setSubmitted(true);
        },
        (error) => {
          setError(true);
          console.error("Error sending feedback:", error);
        }
      );
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">We Value Your Feedback</h1>
      {!submitted ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded-sm bg-transparent focus:outline-none border-theme-border"
          />
          <label htmlFor="feedback" className="block">
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            name="message"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={4}
            className="border p-2 rounded-sm bg-transparent focus:outline-none border-theme-border"
          ></textarea>
          <button
            type="submit"
            className="mb-2 me-2 w-full rounded-md bg-theme-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-600 focus:outline-none"
          >
            Submit Feedback
          </button>
          {error && (
            <p className="text-red-500">
              Error sending feedback. Please try again.
            </p>
          )}
        </form>
      ) : (
        <p className="text-green-500">Thank you for your feedback!</p>
      )}
    </div>
  );
};

export default Feedback;
