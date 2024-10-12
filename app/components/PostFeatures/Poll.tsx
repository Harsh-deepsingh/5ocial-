import { useState } from "react";
import axios from "axios";
import { IconPoint, IconPointFilled, IconTrash } from "@tabler/icons-react";
import Card from "../Card/Card";
import PrimaryButton from "../Buttons/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";

const Poll = ({
  communityId,
  sharedCommunity,
  userId,
}: {
  communityId: string | string[];
  sharedCommunity: string | string[];
  userId: string | undefined;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <>
      <div
        className="text-xs flex flex-col items-start justify-start cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex h-3 mt-1 w-8 justify-start items-start">
          <IconPoint className="w-max" />
          <>___</>
        </div>
        <div className="flex h-7 w-8 justify-start items-start">
          <IconPointFilled className="tet-xs w-max" />
          <>___</>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <PollModal
            options={options}
            newOption={newOption}
            description={description}
            setNewOption={setNewOption}
            setDescription={setDescription}
            handleAddOption={handleAddOption}
            handleDeleteOption={handleDeleteOption}
            setShowModal={setShowModal}
            setOptions={setOptions}
            communityId={communityId}
            sharedCommunity={sharedCommunity}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface PollModalProps {
  options: string[];
  newOption: string;
  description: string;
  setNewOption: (option: string) => void;
  setOptions: (option: string[]) => void;
  setDescription: (desc: string) => void;
  handleAddOption: () => void;
  handleDeleteOption: (index: number) => void;
  setShowModal: (state: boolean) => void;
  communityId: string | string[];
  sharedCommunity: string | string[];
  userId: string | undefined;
}

const PollModal: React.FC<PollModalProps> = ({
  options,
  newOption,
  description,
  communityId,
  sharedCommunity,
  userId,
  setNewOption,
  setDescription,
  handleAddOption,
  handleDeleteOption,
  setShowModal,
  setOptions,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const check = () => {
    if (description && options.length > 1) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (check()) {
      setIsLoading(true);
      setErrorMessage("");

      try {
        if (sharedCommunity !== undefined) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/community/sharedPosts?userId=${userId}`,
            { sharedCommunity, content: description, options }
          );
          setShowModal(false);
          setDescription("");
          setOptions([]);
        } else {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?userId=${userId}&communityId=${communityId}`,
            { content: description, options }
          );
          setShowModal(false);
          setDescription("");
          setOptions([]);
        }
      } catch (error) {
        console.error("Error submitting poll:", error);
        setErrorMessage("Failed to submit poll.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage(
        "Poll should have at least a description and two options"
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-2/3 fixed"
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
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }} // Exit animation
      >
        <Card>
          <div className="flex flex-col items-start justify-start">
            <button
              className="text-2xl absolute top-0 left-2  text-white hover:text-gray-500 "
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
          <h2 className="text-lg font-bold mb-4">Create a Poll</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              className="border focus:outline-none overflow-hidden  border-theme-border bg-transparent rounded p-2 w-full"
              placeholder="Enter poll description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <IconPointFilled className="mr-2" />
                <input
                  type="text"
                  className="border focus:outline-none cursor-default border-theme-border rounded p-2 mr-2 w-full bg-transparent"
                  readOnly
                  value={option}
                />
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteOption(index)}
                >
                  <IconTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="text"
              className="border focus:outline-none  border-theme-border rounded p-2 mr-2 w-full bg-transparent"
              placeholder="Add a new option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <button
              className="bg-transparent border border-theme-border w-1/3 px-3 py-2 rounded"
              onClick={handleAddOption}
            >
              Add
            </button>
          </div>

          <div className="flex justify-end">
            <PrimaryButton onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Poll"}
            </PrimaryButton>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Poll;
