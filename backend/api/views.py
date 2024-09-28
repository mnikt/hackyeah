import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from api.openai import OpenAIAPI


@csrf_exempt
def api(request):
    filenames = [file.file.file.name for file in request.FILES.values()]

    data = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]
    return HttpResponse(content=json.dumps({"status": "OK", "chat": OpenAIAPI().hello(), "transcriptions": data}),
                        content_type="application/json")
