"""
This module defines an API route for processing tourism-related queries using a language model (LLM).

It exposes a single POST endpoint (`/query`) which takes a user query and returns a structured response.
"""


from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.llm import get_llm_response
from typing import Optional

router = APIRouter()


class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    response: str
    query: str


@router.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest) -> QueryResponse:
    """
    process_query handles POST requests to the /query endpoint.
    It takes a user query, processes it using a language model, and returns a structured response.
    Args:
        request (QueryRequest): The request object containing the user query.
    Returns:
        QueryResponse: The structured response containing the LLM's output and the original query.
    Raises:
        HTTPException: If the query is empty or if there is an error processing the request.
    """
    try:
        if not request.query.strip():
            raise HTTPException(
                status_code=400, detail="Query cannot be empty")

        prompt = f"""
        You are a local tour guide. Recommend tourist spots based on the query below.

        For each spot, include:
        - Place name
        - Distance and travel time from the capital city
        - Why it’s worth visiting
        - Safety and security tips

        Only respond to tourism-related queries. If it’s unrelated, politely explain that you only help with travel advice.

        Formatting rules:
        - Leave exactly one blank line between sections
        - Do not use horizontal rules or separators

        Tourist query: "{request.query}"
        """

        response = await get_llm_response(prompt)
        return QueryResponse(response=response, query=request.query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
