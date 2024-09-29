import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from api.openai import OpenAIAPI
from api.vertex import VertexAIAPI


@csrf_exempt
def api(request):
    filenames = [file.file.file.name for file in request.FILES.values()]

    # openai_responses = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]
    # print(openai_responses)
    
    timelined_errors = VertexAIAPI().generate_findings(filenames[0])


    return HttpResponse(
        content=json.dumps(
            {
                "status": "OK", 
                "timelined_errors": timelined_errors
            }
        ),
        content_type="application/json"
    )
