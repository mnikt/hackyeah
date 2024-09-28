import json

from django.http import HttpResponse

from api.openai import OpenAIAPI


def api(request):

    return HttpResponse(content=json.dumps({"status": "OK", "chat": OpenAIAPI().hello(), "transcription": OpenAIAPI().get_file_transcription()}),
                        content_type="application/json")
