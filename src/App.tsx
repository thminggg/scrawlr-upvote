import UpvoteList from "@components/UpdateList/UpvoteList";
import { UpvoteProvider, useUpvoteContext } from "@contexts/UpvoteContext";
import React from "react";

const App: React.FC = () => {
  const { upvotes, addList, resetList } = useUpvoteContext();
  return (
    <div className="flex flex-col p-20 gap-2">
      <button className="button" onClick={resetList}>
        Reset
      </button>
      <button className="button" onClick={addList}>
        Add List
      </button>
      {Object.keys(upvotes).map((id) => (
        <UpvoteList key={id} listId={id} upvoteData={upvotes[id]} />
      ))}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <UpvoteProvider>
    <App />
  </UpvoteProvider>
);

export default AppWrapper;
