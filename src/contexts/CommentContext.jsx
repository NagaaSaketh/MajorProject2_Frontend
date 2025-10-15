import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CommentContext = createContext();

const useCommentContext = () => useContext(CommentContext);

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async (leadId) => {
    try {
      const response = await fetch(
        `https://major-project2-backend-seven.vercel.app/leads/${leadId}/comments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const postComment = async (leadId, agentId) => {
    try {
      if (!agentId) {
        toast.error("Please select an agent");
        return;
      }
      const commentData = {
        author: agentId,
        commentText: newComment,
      };
      const response = await fetch(
        `https://major-project2-backend-seven.vercel.app/leads/${leadId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      setNewComment("");
      await fetchComments(leadId);

      console.log("Added Comment:", data);
      toast.success("Comment Added Successfully.");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        fetchComments,
        newComment,
        postComment,
        setNewComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default useCommentContext;
