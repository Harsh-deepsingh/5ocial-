import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import InputBox from "../InputBox/InputBox";

const PrimaryForm = ({
  onsubmit,
  type,
  placeholder,
  children,
  onChange,
}: {
  onsubmit: () => void;
  type: string;
  placeholder: string;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <form onSubmit={onsubmit}>
        <InputBox
          type={type}
          onChange={onChange}
          placeholder={placeholder}
        ></InputBox>
        <PrimaryButton>{children}</PrimaryButton>
      </form>
    </div>
  );
};

export default PrimaryForm;
