import React, { useRef, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Card from "../Card/Card";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUser } from "../../lib/actions/getUser";
import { logUserInfo } from "../../lib/actions/getUsername";
const OtpForm = ({ email, password }: { email: string; password: string }) => {
  const router = useRouter();
  const [otpArray, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.currentTarget;

    if (/^\d$/.test(value)) {
      const newOtp = [...otpArray];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpArray];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0 && !otpArray[index]) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  async function handleSignIn() {
    try {
      const otp = otpArray.join("");

      const res = await signIn("credentials", {
        email,
        password,
        otp,
        redirect: false,
      });
      if (res?.error) {
        setError("Incorrect Otp or Password please try again");
      } else {
        // setShowOtpForm(true);
        getSession();
        const session = await getUser();
        const communityId = await logUserInfo();
        router.push(`feed/${session?.user.id}/${communityId?.communityId}`);
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <Card>
      <div className="relative w-full rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {otpArray.map((digit, index) => (
                  <div key={index} className="w-14 h-12 sm:w-16 sm:h-16">
                    <input
                      ref={inputRefs[index]}
                      className="bg-transparent w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-theme-border text-lg focus:ring-1 ring-theme-blue"
                      type="text"
                      value={digit}
                      maxLength={1}
                      onInput={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-5  ">
                <p className="text-red-500 text-sm">{error}</p>
                <div>
                  <PrimaryButton onClick={handleSignIn}>Login</PrimaryButton>
                </div>

                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn&apos;t receive code?</p>
                  <a
                    className="flex flex-row items-center text-theme-blue"
                    href="/signin"
                    rel="noopener noreferrer"
                  >
                    try again
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OtpForm;
