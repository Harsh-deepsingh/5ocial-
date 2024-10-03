"use client";
import { IconPhotoPlus } from "@tabler/icons-react";
import { UploadButton } from "../../utils/uploadthing";
import { useState } from "react";
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

      {upload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/4 h-1/2 shadow-lg relative">
            <Card>
              <div className="text-white">
                <button
                  className="text-2xl absolute top-0 left-2 text-white hover:text-gray-500"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
                <UploadButton
                  appearance={{
                    allowedContent: {
                      color: "#a1a1aa",
                      fontSize: "0.8rem",
                      padding: "2px",
                    },
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => handleUploadComplete(res)}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
