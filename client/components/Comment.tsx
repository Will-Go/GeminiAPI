import React from "react";
import { formatDate } from "@/utils/dateFormatter";

export interface CommentProps {
  id: string;
  text: string;
  createdAt: string;
  isSafe?: boolean;
}

export default function Comment({ text, createdAt, isSafe }: CommentProps) {
  return (
    <div className="flex items-center gap-1 p-4  w-full bg-secondary rounded-lg shadow-sm border border-primary-500">
      <div className="w-full">
        <p className={`${!isSafe && "!line-through"} text-sm text-primary-900`}>
          {text}
        </p>
        <p className="text-xs text-primary-400 mt-1">
          enviado en {formatDate(createdAt)}
        </p>
      </div>
      <div>{!isSafe && <>☠️</>}</div>
    </div>
  );
}
