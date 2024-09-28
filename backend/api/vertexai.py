import vertexai
from vertexai.generative_models import GenerativeModel, Part

class VertexAIAPI:
  def __init__(self) -> None:
    self.api_key = VERTEXAI_API_KEY
    
    vertexai.init(project=PROJECT_ID, location="us-central1")

    self.vision_model = GenerativeModel("gemini-1.5-flash-002")
    
  def _make_request(self, prompt: str):
    self.vision_model.generate_content(
    [
      
        Part.from_uri(
            "gs://cloud-samples-data/video/animals.mp4", mime_type="video/mp4"
        ),
        prompt,
    ]
)