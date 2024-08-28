import Upvote from "@components/Upvote/Upvote";
import { useUpvoteContext } from "@contexts/UpvoteContext";
import React from "react";
import { FaPlus } from "react-icons/fa";

type UpvoteListProps = {
  listId: string;
  upvoteData: Array<boolean>;
};

const UpvoteList: React.FC<UpvoteListProps> = ({ listId, upvoteData }) => {
  const { toggleUpvote, addUpvote } = useUpvoteContext();

  /**
   * Handle click event on upvote buttons
   * @param {React.MouseEvent<HTMLDivElement>} event
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;

    // Only toggle state when it clicks on an upvote button
    if (target !== currentTarget) toggleUpvote(listId);
  };

  return (
    <div className="flex items-center">
      {/* Handle with Event Bubbling */}
      <div
        className="flex flex-wrap w-10/12 gap-4 p-3 border-2"
        onClick={handleClick}
      >
        {upvoteData.map((isSelected, index) => (
          <Upvote key={index} isSelected={isSelected} />
        ))}
      </div>
      <button className="button h-fit ml-2" onClick={() => addUpvote(listId)}>
        <FaPlus />
      </button>
    </div>
  );
};

export default UpvoteList;
