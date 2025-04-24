/**
 * The main page of the application, rendering a chat-like interface for travel queries.
 * Displays a welcome message when no queries are submitted, which disappears after the first query.
 *
 * @returns {JSX.Element} A chat interface.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import QueryInput from "./components/QueryInput";
import ResponseDisplay from "./components/ResponseDisplay";

interface Response {
  query: string;
  response: string;
}

export default function Home() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const responsesEndRef = useRef<HTMLDivElement>(null);

  const handleQuery = async (query: string) => {
    setPendingQuery(query);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, session_id: sessionId }),
      });
      if (!res.ok) throw new Error("Failed to fetch response");
      const data = await res.json();
      setResponses((prev) => [...prev, { query, response: data.response }]);
      setSessionId(data.session_id);
      setPendingQuery(null);
    } catch (err) {
      setError("Failed to fetch response. Please try again.");
      setPendingQuery(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    responsesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses, pendingQuery]);

  return (
    <main className="flex justify-center min-h-screen">
      <div className="card pb-32 sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mx-auto">
        <div className="card-body">
          {responses.length === 0 && !pendingQuery && !error && !loading && (
            <div className="w-full h-full flex justify-center items-center">
              <div className="card-body">
                <h2 className="card-title">🌍 Hey Traveler!</h2>
                <p>Great to have you here! I’m your virtual guide, ready to help you discover exciting destinations, 
                  travel requirements, and more. Just enter your question below to get started — for example: 
                  <strong> "What places can I visit in Tanzania?"</strong> 
                </p>
              </div>
          </div>
          )}
          {error && <p className="text-error">{error}</p>}
          {responses.map((item, index) => (
            <ResponseDisplay key={index} query={item.query} response={item.response} />
          ))}
          {pendingQuery && loading && (
            <ResponseDisplay query={pendingQuery} response="" isLoading={true} />
          )}
          <div ref={responsesEndRef}></div>
        </div>
        <QueryInput onSubmit={handleQuery} loading={loading} />
      </div>
    </main>
  );
}