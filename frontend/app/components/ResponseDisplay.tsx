/**
 * Renders a chat-like display for a user query and assistant response using DaisyUI chat bubbles.
 *
 * @param {string} query - The user's query to display in the `chat-end` bubble.
 * @param {string} response - The AI markdown response to render in the `chat-start` bubble.
 * @param {boolean} [isLoading=false] - Whether to show a loading spinner instead of the response.
 * @returns {JSX.Element} A chat UI with query and response/spinner in DaisyUI-styled bubbles.
 */

import ReactMarkdown from "react-markdown";

interface ResponseDisplayProps {
  response: string;
  query: string;
  isLoading?: boolean;
}

export default function ResponseDisplay({
  response,
  query,
  isLoading = false,
}: ResponseDisplayProps) {
  return (
    <div>
      <div className="chat chat-end">
        <div className="chat-bubble">{query}</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble">
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}