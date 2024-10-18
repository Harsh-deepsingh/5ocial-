"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { memo, useCallback, useState, useEffect } from "react";
import InputBox from "../components/InputBox/InputBox";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Card from "../components/Card/Card";
import SecButton from "../components/Buttons/SecButton";
import OtpForm from "../components/otpForm/OtpForm";
import { z } from "zod";
import generateOtp from "../lib/actions/generateOtp";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUser } from "../lib/actions/getUser";
import { logUserInfo } from "../lib/actions/getUsername";

const credentialsSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        message: "password does not meet complexity requirements",
      });
    }
  });

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const handleEmailChange = useCallback(
    (e: React.FormEvent<EventTarget>) =>
      setEmail((e.target as HTMLTextAreaElement).value.toLocaleLowerCase()),
    [email]
  );

  const handlePasswordChange = useCallback(
    (e: React.FormEvent<EventTarget>) =>
      setPassword((e.target as HTMLTextAreaElement).value),
    [password]
  );

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const validateInput = () => {
    if (!email || !password) {
      setError("Email or password cannot be empty.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignIn = async () => {
    try {
      credentialsSchema.parse({ email, password });
      setError("");
      await generateOtp(email);
      setShowOtpForm(true);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  const handleGuest = () => {
    setEmail("demo@gmail.com");
    setPassword("1234567890@DemoUser");
    setIsGuest(true);
  };
  useEffect(() => {
    async function handleDemoSignin() {
      if (
        isGuest &&
        email === "demo@gmail.com" &&
        password === "1234567890@DemoUser"
      ) {
        const otp = "3448";
        const res = await signIn("credentials", {
          email,
          password,
          otp,
          redirect: false,
        });
        if (res?.error) {
          console.log(res.error);

          setError("Incorrect Otp please try again");
        } else {
          // setShowOtpForm(true);
          alert(
            "If you are redirected to the home page instead of the feed, please refresh the page."
          );
          getSession();
          const session = await getUser();

          const communityId = await logUserInfo();
          router.push(`feed/${session?.user.id}/${communityId?.communityId}`);
        }
      }
    }
    handleDemoSignin();
  }, [email, password, isGuest]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="relative z-10">
        <Card>
          <p className="font-bold text-2xl text-white">
            Sign in to Blindly Social
          </p>
          <label>
            Email
            <InputBox
              onChange={handleEmailChange}
              type="email"
              placeholder="name@email.com"
            />
          </label>
          <label className="relative">
            Password
            <PasswordVisibility
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
            <InputBox
              onChange={handlePasswordChange}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  setIsPasswordVisible(false);
                  handleSignIn();
                }
              }}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="text-red-500 text-warp w-56 text-xs">{error}</p>
          )}

          <div className="flex justify-between">
            {/* <p className="text-xs">Forgot password?</p> */}
          </div>
          <PrimaryButton onClick={handleSignIn}>Verify Email</PrimaryButton>
          <SecButton onClick={handleGuest}>Guest</SecButton>
        </Card>
      </div>
      <OtpModal
        password={password}
        showOtpForm={showOtpForm}
        email={email}
      ></OtpModal>
    </div>
  );
};

const PasswordVisibility = memo(
  ({
    isPasswordVisible,
    togglePasswordVisibility,
  }: {
    isPasswordVisible: boolean;
    togglePasswordVisibility: () => void;
  }) => {
    return (
      <button
        className="absolute left-48 md:left-80 top-11 transform -translate-y-1/2 w-9 h-10 text-gray-500"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.7 135.7 0 0 1 20.44 128A135.7 135.7 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.8 135.8 0 0 1 235.56 128A135.7 135.7 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              <path
                strokeLinejoin="round"
                d="M10.73 5.073A11 11 0 0 1 12 5c4.664 0 8.4 2.903 10 7a11.6 11.6 0 0 1-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 0 0 5.48-1.52m-7.6-7.6a3 3 0 1 0 4.243 4.243"
              />
              <path d="m4 4l16 16" />
            </g>
          </svg>
        )}
      </button>
    );
  }
);
PasswordVisibility.displayName = "PasswordVisibility";

const OtpModal = ({
  showOtpForm,
  email,
  password,
}: {
  showOtpForm: boolean;
  email: string;
  password: string;
}) => {
  return (
    <AnimatePresence>
      {showOtpForm && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="md:w-2/5  sm:w-3/6 w-9/12 "
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <OtpForm email={email} password={password} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Signin);
