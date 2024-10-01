import base64
from typing import Iterable, Any

import vertexai
import logging
import json

from vertexai.generative_models import GenerativeModel, Part

from api.prompts import VERTEX_COMPARISON_PROMPT, VERTEX_SEMANTICS_PROMPT, VERTEX_ERRORS_PROMPTS
from api.secrets import PROJECT_ID


class VertexAIAPI:
    def __init__(self) -> None:
        vertexai.init(project=PROJECT_ID, location="us-central1")

        self.vision_model = GenerativeModel("gemini-1.5-pro-002")

    def _make_request(self, file_encoded: str, prompt: str) -> str:
        part = Part.from_data(
            data=base64.b64decode(file_encoded), mime_type="video/mp4"
        )

        response = self.vision_model.generate_content([part, prompt])

        logging.debug(f'response: {response.text}')
        return response.text

    def _make_request_with_multiple_prompts(self, file_encoded: str, prompts: list[str]):
        part = Part.from_data(
            data=base64.b64decode(file_encoded), mime_type="video/mp4"
        )

        response = self.vision_model.generate_content([part, *prompts])

        logging.debug(f'response: {response.text}')
        return response.text

    def _make_request_with_multiple_files(self, files: Iterable[str], prompt: str):
        parts = [
            Part.from_data(
                data=base64.b64decode(f), mime_type="video/mp4"
            )
            for f in files
        ]

        response = self.vision_model.generate_content([*parts, prompt])

        logging.debug(f'response: {response.text}')
        return response.text

    @staticmethod
    def _extract_json(content: str):
        json_start_phrase = '```json'
        start = content.find(json_start_phrase) + len(json_start_phrase)
        end = content.find('```', start + 1)
        return json.loads(content[start:end])

    def generate_timestamped_errors(self, base64_vid: str):
        logging.debug(f'generating errors with timestamps')

        response = self._make_request_with_multiple_prompts(base64_vid, VERTEX_ERRORS_PROMPTS)
        return VertexAIAPI._extract_json(response)

    def generate_sematic_analysis(self, base64_video: str) -> Any:
        logging.debug('generating semantic analysis')

        response = self._make_request(base64_video, VERTEX_SEMANTICS_PROMPT)
        return VertexAIAPI._extract_json(response)

    def generate_comparison(self, base64_videos: Iterable[str]) -> Any:
        logging.debug('generate_comparison')

        response = self._make_request_with_multiple_files(base64_videos, VERTEX_COMPARISON_PROMPT)
        return VertexAIAPI._extract_json(response)
