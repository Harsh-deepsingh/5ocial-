"use client";
import PrimaryButton from "./components/Buttons/PrimaryButton";

export default function Home() {
  const click = () => {
    console.log("HELLO");
  };
  return (
    <div className="flex justify-center items-center">
      <PrimaryButton onClick={click}>{"post"}</PrimaryButton>
    </div>
  );
}
