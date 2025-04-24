"""
DeepSeek LLM API Client
This module provides a function to interact with the DeepSeek LLM API.
It includes error handling for API key configuration and response validation.
It uses the aiohttp library for asynchronous HTTP requests.
"""
import os
import aiohttp
from fastapi import HTTPException


async def get_llm_response(prompt: str) -> str:
    """
    get_llm_response sends a prompt to the DeepSeek LLM API and returns the response.
    Args:
        prompt (str): The prompt to send to the LLM.
    Returns:
        str: The response from the LLM.
    Raises:
        HTTPException: If the API key is not configured or if the API request fails.
    """
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500, detail="DeepSeek API key not configured")

    url = "https://api.deepseek.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, json=payload) as response:
            if response.status != 200:
                raise HTTPException(
                    status_code=500, detail="Failed to get response from DeepSeek")
            data = await response.json()
            return data["choices"][0]["message"]["content"]
