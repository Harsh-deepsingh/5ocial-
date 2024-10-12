"use client";
import { IconPhotoPlus } from "@tabler/icons-react";
import { UploadButton } from "../../utils/uploadthing";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for conditional animation
import Card from "../Card/Card";
import { ClientUploadedFileData } from "uploadthing/types";

const Images = ({ sendUrl }: { sendUrl: (arg0: string) => void }) => {
  const [upload, setUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleCloseModal = () => {
    setUpload(false);
  };

  const handleUploadComplete = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[] | { url: any }[]
  ) => {
    const uploadedImageUrl = res[0]?.url;
    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
      sendUrl(uploadedImageUrl);
    }
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={() => setUpload(true)}>
        <IconPhotoPlus />
      </button>

      <AnimatePresence>
        {upload && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-3/4 h-1/2 flex justify-center items-center shadow-lg relative bg-theme-grey border border-theme-border rounded-md"
              initial={{ y: 60, scale: 0.5, opacity: 0 }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}
            >
              <div className="text-white">
                <button
                  className="text-2xl absolute top-0 left-2 text-white hover:text-gray-500"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => handleUploadComplete(res)}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  appearance={{
                    allowedContent: {
                      color: "#a1a1aa",
                      fontSize: "0.8rem",
                      padding: "2px",
                    },
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Images;
