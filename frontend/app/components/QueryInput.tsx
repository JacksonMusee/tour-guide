/**
 * Renders a fixed input form at the bottom of the screen for submitting travel queries in a chat-like interface.
 * Displays a DaisyUI-styled textarea and submit button, handling query input and submission. The textarea clears
 * after a valid submission, and the button shows a "Processing..." state when loading.
 *
 * @param {function} onSubmit - Callback function to handle the submitted query.
 * @param {boolean} loading - Indicates if a query is being processed, disabling the button and showing "Processing...".
 * @returns {JSX.Element} A fixed form with a textarea and submit button styled with DaisyUI.
 */

"use client";

import { useState } from "react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  loading: boolean;
}

export default function QueryInput({ onSubmit, loading }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery("");
    }
  };

  return (
    <div className="flex justify-center z-50 fixed bottom-0 z-50 bg-white p-8 sm:w-3/4 md:w-3/4 lg:w-1/2 xl:w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-2 w-full"
      >
        <textarea
          className="textarea textarea-bordered w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I'm your travel assistant. Ask me anything about travelling!" rows={4}
          style={{ resize: "none" }}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </form>
    </div>
  );
}