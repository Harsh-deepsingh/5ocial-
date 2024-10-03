const DislikeIcon = ({
  dislike,
  DislikeCount,
}: {
  dislike: boolean;
  DislikeCount: number;
}) => {
  return (
    <div className="bg-transparent hover:bg-[rgba(249,24,24,0.13)] p-1.5 rounded-full flex justify-center items-center gap-1 group">
      {dislike ? (
        <div className="flex justify-center items-center gap-1 flex-col md:flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4em"
            height="1.4em"
            viewBox="0 0 24 24"
            className=" group-hover:rgb(249,24,24)"
          >
            <path
              fill="rgb(249, 24, 24)"
              d="M19 15h4V3h-4m-4 0H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2a2 2 0 0 0 2 2h6.31l-.95 4.57c-.02.1-.03.2-.03.31c0 .42.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5a2 2 0 0 0-2-2"
            />
          </svg>
          <div className="w-6 text-xs text-[rgb(249,24,24)] font-bold">
            {DislikeCount}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-1 flex-col md:flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4em"
            height="1.4em"
            viewBox="0 0 24 24"
            className=" group-hover:rgb(249,24,24)"
          >
            <path
              fill="currentColor"
              d="M19 15V3h4v12zM15 3a2 2 0 0 1 2 2v10c0 .55-.22 1.05-.59 1.41L9.83 23l-1.06-1.06c-.27-.27-.44-.64-.44-1.06l.03-.31l.95-4.57H3a2 2 0 0 1-2-2v-2c0-.26.05-.5.14-.73l3.02-7.05C4.46 3.5 5.17 3 6 3zm0 2H5.97L3 12v2h8.78l-1.13 5.32L15 14.97z"
            />
          </svg>
          <div className="w-6 text-xs font-bold">{DislikeCount}</div>
        </div>
      )}
    </div>
  );
};

export default DislikeIcon;
