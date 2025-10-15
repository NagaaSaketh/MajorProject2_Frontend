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
    console.log("leadId:", leadId);
    console.log("agentId:", agentId);
    console.log("newComment:", newComment);

    try {
      if (!agentId) {
        toast.error("Please select an agent");
        return;
      }
      const commentData = {
        author: agentId,
        commentText: newComment,
      };

      console.log("=== FRONTEND: Posting comment ===");
      console.log("Lead ID:", leadId);
      console.log("Agent ID:", agentId);
      console.log("Comment Data:", commentData);
      console.log("API URL:", `https://major-project2-backend-seven.vercel.app/leads/${leadId}/comments`);
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
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      console.log("=== BACKEND RESPONSE ===");
      console.log("Comment response data:", data);
      console.log("Author in response:", data.author);
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
