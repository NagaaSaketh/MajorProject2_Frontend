import { createContext, useContext, useState , useEffect } from "react";

const TagContext = createContext();

const useTagContext = () => useContext(TagContext);

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const response = await fetch("https://major-project2-backend-seven.vercel.app/tags");
      if (!response.ok) {
        throw new Error("Failed to fetch tags.");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return <TagContext.Provider value={{tags}} >{children}</TagContext.Provider>;
};

export default useTagContext;
