
from moviepy.video.io.VideoFileClip import VideoFileClip
from openai import OpenAI
from api.secrets import OPENAI_API_KEY


class OpenAIAPI:
    def __init__(self):
        self.api_key = OPENAI_API_KEY
        self.client = OpenAI(api_key=self.api_key)

    def _make_chat_request(self, query: str):
        completion = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": query,

                }
            ]
        )

        return completion.choices[0].message.content

    def get_file_transcription(self, file):
        file = OpenAIAPI.video_to_audio(file)
        with open(file, "rb") as f:
            transcription = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=f,
                response_format="verbose_json",
                timestamp_granularities=["word"]
            )

        return transcription.to_json()

    def hello(self):
        return self._make_chat_request("Hello chat!")

    @staticmethod
    def video_to_audio(file):
        # with open("audio.mp3", "wb+") as output_file:
        video = VideoFileClip(file)
        video.audio.write_audiofile(f'{file}.mp3', codec="mp3")
        return f'{file}.mp3'
