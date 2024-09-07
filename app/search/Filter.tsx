// import React, { useState, useEffect } from "react";
// import ProfileButton from "../../components/Buttons/ProfileButton";
// import Card from "../../components/Card/Card";
// import SearchBar from "./SearchBar";
// import Line from "../../components/Line/Line";
// const Filter = () => {
//   const [showCard, setShowCard] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const handleScroll = () => {
//     if (window.scrollY < lastScrollY || window.scrollY < 50) {
//       setShowCard(true);
//     } else {
//       setShowCard(false);
//     }
//     setLastScrollY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   const handleSearch = () => {
//     console.log("");
//   };
//   return (
//     <>
//       <div
//         className={`sticky top-0 z-10 transition-transform duration-300 ${
//           showCard ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <Card>
//           <div className="justify-center flex">
//             <SearchBar type="search" onChange={handleSearch} />
//           </div>
//           <Line />
//           <Sections></Sections>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Filter;

// const Sections = () => {
//   const [activeButton, setActiveButton] = useState("Post");

//   const handleButtonClick = (buttonName: string) => {
//     setActiveButton(buttonName);
//   };
//   return (
//     <div>
//       <div className="flex justify-between h-16 text-theme-border">
//         {/* <ProfileButton
//           isActive={activeButton === "All"}
//           onClick={() => handleButtonClick("All")}
//         >
//           All
//         </ProfileButton> */}
//         <ProfileButton
//           isActive={activeButton === "Post"}
//           onClick={() => handleButtonClick("Post")}
//         >
//           Post
//         </ProfileButton>
//         <ProfileButton
//           isActive={activeButton === "Communities"}
//           onClick={() => handleButtonClick("Communities")}
//         >
//           Communities
//         </ProfileButton>
//         <ProfileButton
//           isActive={activeButton === "Users"}
//           onClick={() => handleButtonClick("Users")}
//         >
//           Users
//         </ProfileButton>{" "}
//         <ProfileButton
//           isActive={activeButton === "Shared Posts"}
//           onClick={() => handleButtonClick("Shared Posts")}
//         >
//           Shared Posts
//         </ProfileButton>
//       </div>
//     </div>
//   );
// };
