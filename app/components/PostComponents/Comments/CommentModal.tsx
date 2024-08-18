import React from "react";
import Card from "../../Card/Card";

const CommentModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-auto ">
      <div className="w-3/6 mt-11">
        <Card>
          <div>
            <button className="text-white text-3xl" onClick={onClose}>
              &times;
            </button>
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default CommentModal;
