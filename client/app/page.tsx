"use client";
import { useState } from "react";
import Comment, { CommentProps } from "@/components/Comment";
import axiosInstance from "@/utils/axiosServices";

export default function Chat() {
  const [comments, setComments] = useState<CommentProps[]>([
    {
      id: "1",
      text: "Hola muy buenas",
      createdAt: "2025-03-19T10:00:00Z",
      isSafe: true,
    },
    {
      id: "2",
      text: "Que feo tu comentario mejor ni comentes",
      createdAt: "2025-03-19T10:05:00Z",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comments
    try {
      const isSafe = (await axiosInstance.post("/api/gemini/moderator", {
        text: newComment,
      })) as { data: { result: boolean } };
      const comment: CommentProps = {
        id: Date.now().toString(), // Simple unique ID (replace with UUID in production)
        text: newComment,
        createdAt: new Date().toISOString(),
        isSafe: isSafe.data.result,
      };

      setComments((prevComments) => [...prevComments, comment]);
      setNewComment(""); // Clear input
    } catch (error) {
      console.log("Failed to submit comment", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* Background blur */}
      <div className="absolute top-0 h-96 w-96 blur-[150px] rounded-full bg-accent-700 animate-pulse"></div>

      {/* CONTENT */}
      {/* Welcome Message (Top) */}
      <header className="w-full pt-6 text-primary-300 shadow-md z-20   ">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">
            ¡Bienvenido a la Sección de Comentarios!
          </h1>
          <p className="mt-2 text-accent-300">
            Comparte tus pensamientos y únete a la conversación. Con cuidado con
            hacer comantario ofensivos
          </p>
        </div>
      </header>

      {/* Comments Section (Center) */}
      <main className="flex-grow w-full flex items-center justify-center z-10">
        <div className="grid gap-2 w-full max-w-3xl px-4 max-h-[60vh] overflow-y-auto">
          {/* Placeholder for comments */}
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </main>

      {/* Input Section (Bottom) */}
      <footer className=" max-w-4/6 w-full mx-4 py-3 mb-6 bg-primary-500/20 backdrop-blur-lg rounded-2xl border border-primary-400/50 shadow-lg ">
        <form onSubmit={handleSubmit} className="flex items-center w-full ">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Agregar Comentario"
            className="p-4 w-full shadow-sm text-secondary placeholder-primary-500 focus:outline-none focus:ring-0  focus:border-accent-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="px-6 py-4  text-accent-400 hover:opacity-60 rounded-xl font-semibold cursor-pointer  transition-all duration-200"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}
