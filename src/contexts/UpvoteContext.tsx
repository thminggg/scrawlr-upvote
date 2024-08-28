import { genId } from "@utils/genId";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Upvotes = {
  [id: string]: boolean[];
};

export type UpvoteContextType = {
  upvotes: Upvotes;
  toggleUpvote: (listId: string) => void;
  addUpvote: (listId: string) => void;
  addList: () => void;
  resetList: () => void;
};

const UpvoteContext = createContext<UpvoteContextType | undefined>(undefined);

/**
 * A hook to use values and methods defined in the context
 * @returns {UpvoteContext}
 */
export const useUpvoteContext = () => {
  const context = useContext(UpvoteContext);
  if (!context) {
    throw new Error("useUpvoteContext must be used within a UpvoteProvider");
  }
  return context;
};

type UpvoteProviderProps = {
  children: ReactNode;
};

export const UpvoteProvider = ({ children }: UpvoteProviderProps) => {
  const LOCAL_STORAGE_UPVOTE = "upvotes";
  const defaultLists = { [genId()]: [false] };

  const [upvotes, setUpvotes] = useState<Upvotes>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_UPVOTE);
    return savedData ? JSON.parse(savedData) : defaultLists;
  });

  useEffect(() => {
    // Save the state in localStorage to persist the change over refresh
    localStorage.setItem(LOCAL_STORAGE_UPVOTE, JSON.stringify(upvotes));
  }, [upvotes]);

  /**
   * Toogle the state of all upvotes in a list
   * @param {string} id ID of the list
   * @returns {void}
   */
  const toggleUpvote = (id: string) =>
    setUpvotes((prev) => {
      // Get state of the select list
      const state = !prev[id][0];
      return { ...prev, [id]: prev[id].map(() => state) };
    });

  /**
   * Add upvote button in a list
   * @param {string} id ID of the list
   * @returns {void}
   */
  const addUpvote = (id: string) =>
    setUpvotes((prev) => {
      // Get state of the select list
      const state = prev[id][0];
      const newItem = [...prev[id], state];

      return { ...prev, [id]: newItem };
    });

  /**
   * Add upvote list
   * @returns {void}
   */
  const addList = () => {
    setUpvotes((prev) => {
      return {
        ...prev,
        [genId()]: [false],
      };
    });
  };

  /**
   * Reset localStorage not to persist the data
   */
  const resetList = () => {
    if (window) {
      localStorage.setItem(LOCAL_STORAGE_UPVOTE, JSON.stringify(defaultLists));
      location.reload();
    }
  };

  return (
    <UpvoteContext.Provider
      value={{ upvotes, toggleUpvote, addUpvote, addList, resetList }}
    >
      {children}
    </UpvoteContext.Provider>
  );
};
