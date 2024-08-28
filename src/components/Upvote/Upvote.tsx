import React from "react";
import { FaArrowUp } from "react-icons/fa";

type UpvoteProps = {
  isSelected: boolean;
};

const deafultUpvote = { bg: "#F4F6F8", arrow: "#343A40" };
const selectedUpvote = { bg: "#E5E8FD", arrow: "#253CF2" };

const Upvote: React.FC<UpvoteProps> = ({ isSelected }) => {
  return (
    <button
      className="button"
      style={{
        backgroundColor: isSelected ? selectedUpvote.bg : deafultUpvote.bg,
      }}
    >
      <FaArrowUp
        style={{
          color: isSelected ? selectedUpvote.arrow : deafultUpvote.arrow,
        }}
      />
    </button>
  );
};

export default Upvote;
