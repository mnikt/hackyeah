import base64
from threading import Thread
from typing import Any

from moviepy.video.io.VideoFileClip import VideoFileClip

from api.openai import OpenAIAPI
from api.vertex import VertexAIAPI


class VideoProcessor:
    def __init__(self):
        self.open_api = OpenAIAPI()
        self.vertex_api = VertexAIAPI()

    def get_video_data(self, filename: str) -> Any:
        data = {}

        t1 = Thread(target=self._get_video_data_from_chat, args=(filename, data))
        t1.start()

        encoded_video = VideoProcessor.encode_file_to_base64(filename)

        t2 = Thread(target=VideoProcessor._get_timestamped_errors_from_vertex, args=(encoded_video, data))
        t2.start()

        t3 = Thread(target=VideoProcessor._get_semantic_analysis_from_vertex, args=(encoded_video, data))
        t3.start()

        for t in (t1, t2, t3):
            t.join()
        print("JOINED")

        return data

    def _get_video_data_from_chat(self, filename: str, data: dict) -> None:
        video = VideoFileClip(filename)
        transcription = self.open_api.get_video_transcription(video)
        video_data = self.open_api.get_data_from_video_transcription(transcription.text)

        data['video_duration'] = int(video.duration)
        data['word_count'] = transcription.text.count(" ") + 1
        data['transcription'] = transcription.text
        data['timestamp_transcription'] = [{'timestamp': segment.start, 'text': segment.text} for segment in
                                           transcription.segments]
        data['keywords'] = video_data.get('klucze')
        data['questions'] = video_data.get('pytania')
        data['education_level'] = video_data.get('wyksztalcenie')
        data['interest_level'] = video_data.get('zainteresowanie')
        data['translation'] = video_data.get('eng')
        data['summary'] = video_data.get('podsumowanie')
        print("CHAT DONE")

    @staticmethod
    def _get_timestamped_errors_from_vertex(encoded_video: str, data: dict) -> None:
        data['timelined_errors'] = VertexAIAPI().generate_timestamped_errors(encoded_video)
        print("TIMESTAMPS DONE")

    @staticmethod
    def _get_semantic_analysis_from_vertex(self, encoded_video: str, data: dict) -> None:
        data['semantic_analysis'] = VertexAIAPI().generate_sematic_analysis(encoded_video)
        print("SEMANTICS DONE")

    def get_videos_comparison(self, filenames: list[str]) -> Any:
        encoded_videos = map(VideoProcessor.encode_file_to_base64, filenames)
        return self.vertex_api.generate_comparison(encoded_videos)

    @staticmethod
    def encode_file_to_base64(filepath: str) -> str:
        with open(filepath, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")
