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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div>
        <Card>
          <button
            className="absolute top-2 right-2 text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </Card>
      </div>
    </div>
  );
};

export default CommentModal;
