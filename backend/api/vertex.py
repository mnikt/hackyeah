import base64
import vertexai

from vertexai.generative_models import GenerativeModel, Part
from api.secrets import PROJECT_ID

prompt = 'Co jest na video?'

class VertexAIAPI:
  def __init__(self) -> None:    
    vertexai.init(project=PROJECT_ID, location="us-central1")

    self.vision_model = GenerativeModel("gemini-1.5-flash-002")
    
  def _make_request(self, file_encoded: str, prompt: str):
    self.vision_model.generate_content(
      [
        Part.from_data(
          data=base64.b64decode(file_encoded), mime_type="video/mp4"
        ),
        prompt,
      ]
    )
    
  def _parse_video_to_base64(self, path: str):
    # Read the video file in binary mode
    with open(path, "rb") as file:
        # Convert the binary content of the file to base64
      encoded_string = base64.b64encode(file.read())

    return encoded_string
  
  def generate_findings(self, file_path: str):
    encoded_video = self._parse_video_to_base64(file_path)

    response = self._make_request(encoded_video, prompt)
    
    return response