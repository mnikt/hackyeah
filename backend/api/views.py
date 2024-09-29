import json
import base64

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from moviepy.video.io.VideoFileClip import VideoFileClip

from api.openai import OpenAIAPI
from api.vertex import VertexAIAPI


@csrf_exempt
def api(request):
    # for file in request.FILES.values():
    #     with open(f'videos/{file.name}', 'wb+') as destination:
    #         destination.write(file.read())
    filenames = [file.file.file.name for file in request.FILES.values()]

    sizes = [file.size for file in request.FILES.values()]
    filename = filenames[0]
    video = VideoFileClip(filename)
    transcription_data = OpenAIAPI().get_file_transcription(video)

    # openai_responses = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]
    # print(openai_responses)
    
    encoded_video = base64.b64encode(open(filenames[0], "rb").read()).decode("utf-8")
    timelined_errors = VertexAIAPI().generate_timestamped_errors(encoded_video)
    semantical_analysis = VertexAIAPI().generate_sematical_analysis(encoded_video)


    # transcription_data = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]

    overall_score = 50
    video_duration = int(video.duration)
    video_size = int(sizes[0] / 1024 / 1024)
    word_count = transcription_data.text.count(" ") + 1
    chat = OpenAIAPI().make_chat_request(transcription_data.text)

    data = {
        'chat': chat,
        'keywords': chat.get('slowa_kluczowe'),
        'questions': chat.get('pytania'),
        'education_level': chat.get('ocena_wyksztalcenie'),
        'interest_level': chat.get('ocena_zainteresowania'),
        'overall_score': overall_score,
        'video_duration': video_duration,
        'video_size': video_size,
        'word_count': word_count,
        'transcription': transcription_data.text,
        'semantic_analysis': semantical_analysis,
        'timelined_errors': timelined_errors,
        # 'transcription_timestamps': transcription_data.words,
        'summary': chat.get('podsumowanie')
    }

    return HttpResponse(content=json.dumps(data), content_type="application/json")
