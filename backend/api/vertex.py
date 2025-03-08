import base64
import os
from typing import Iterable, Any

import google
import vertexai
import logging
import json

from vertexai.generative_models import GenerativeModel, Part

from api.prompts import VERTEX_PROMPT
from api.secrets import PROJECT_ID


class VertexAIAPI:
    def __init__(self) -> None:
        credentials, project = google.auth.load_credentials_from_file('/home/mrcn/Downloads/magnetic-guild-437016-c0-ce1a98fb1990.json')
        # os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/home/mrcn/Downloads/magnetic-guild-437016-c0-ce1a98fb1990.json'
        vertexai.init(project=project, credentials=credentials, location="us-central1")

        self.vision_model = GenerativeModel("gemini-1.5-pro-002")

    def _make_request(self, file_encoded: str, prompt: str) -> str:
        part = Part.from_data(
            data=base64.b64decode(file_encoded), mime_type="video/mp4"
        )

        response = self.vision_model.generate_content([part, prompt])

        logging.debug(f'response: {response.text}')
        return response.text

    @staticmethod
    def _extract_json(content: str):
        json_start_phrase = '```json'
        start = content.find(json_start_phrase) + len(json_start_phrase)
        end = content.find('```', start + 1)
        return json.loads(content[start:end])

    def generate_sematic_analysis(self, base64_video: str) -> Any:
        logging.debug('generating semantic analysis')

        response = self._make_request(base64_video, VERTEX_PROMPT)
        return VertexAIAPI._extract_json(response)
