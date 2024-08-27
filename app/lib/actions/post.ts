// //"use server";
// import axios from "axios";

// export const handleSubmit = async ({
//   userId,
//   communityId,
//   text,
//   setLoading,
//   setError,
//   setText,
//   onPost,
// }) => {
//   if (!text.trim()) {
//     setError("Please enter some content.");
//     return;
//   }

//   setLoading(true);
//   setError("");

//   try {
//     const response = await axios.post(
//       `http://localhost:3000/api/post?userId=${userId}&communityId=${communityId}`,
//       { content: text }
//     );
//     console.log("Post submitted:", response.data);
//     setText(""); // Clear the textarea after submission
//     if (onPost) onPost(); // Call the onPost callback if provided
//   } catch (error) {
//     console.error("Error submitting post:", error);
//     setError("Failed to submit the post. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };
