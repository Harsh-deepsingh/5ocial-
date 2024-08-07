import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import InputBox from "../InputBox/InputBox";

const PrimaryForm = ({
  onsubmit,
  type,
  placeholder,
  children,
}: {
  onsubmit: () => void;
  type: string;
  placeholder: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <form onSubmit={onsubmit}>
        <InputBox type={type} placeholder={placeholder}></InputBox>
        <PrimaryButton>{children}</PrimaryButton>
      </form>
    </div>
  );
};

export default PrimaryForm;
