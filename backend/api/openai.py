import json
from typing import Any

from moviepy.video.io.VideoFileClip import VideoFileClip
from openai import OpenAI
from openai.types.audio.transcription_verbose import TranscriptionVerbose

from api.prompts import CHAT_PROMPT
from api.secrets import OPENAI_API_KEY


class OpenAIAPI:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def get_data_from_video_transcription(self, transcription: str) -> Any:
        data = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content":  CHAT_PROMPT.replace('$text$', transcription)
                },
            ]
        ).choices[0].message.content

        return json.loads(data)

    def get_video_transcription(self, video) -> TranscriptionVerbose:
        audio_file_path = OpenAIAPI._get_audio_from_video(video)

        with open(audio_file_path, "rb") as audio_file:
            return self.client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="verbose_json",
                timestamp_granularities=["segment"]
            )

    @staticmethod
    def _get_audio_from_video(video: VideoFileClip) -> str:
        video.audio.write_audiofile(f'{video.filename}.mp3', codec="mp3")
        return f'{video.filename}.mp3'
