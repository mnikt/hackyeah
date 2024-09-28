import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from api.openai import OpenAIAPI
from api.vertex import VertexAIAPI


@csrf_exempt
def api(request):
    filenames = [file.file.file.name for file in request.FILES.values()]

    openai_responses = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]
    print(openai_responses)
    
    vertex_responses = [VertexAIAPI().generate_findings(filename) for filename in filenames]
    print(vertex_responses)


    return HttpResponse(content=json.dumps({"status": "OK", "chat": OpenAIAPI().hello(), "transcriptions": vertex_responses}),
                        content_type="application/json")
