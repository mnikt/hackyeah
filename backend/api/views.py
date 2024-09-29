import json
import base64
from threading import Thread

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from moviepy.video.io.VideoFileClip import VideoFileClip

from api.openai import OpenAIAPI
from api.vertex import VertexAIAPI


def create_transcription(filename, data):
    video = VideoFileClip(filename)
    data['video_duration'] = int(video.duration)
    open_client = OpenAIAPI()
    data['transcription_data'] = open_client.get_file_transcription(video)
    data['chat'] = open_client.make_chat_request(data['transcription_data'].text)


def create_semantic_analysis(encoded_video, vertex, data):
    data['semantic_analysis'] = vertex.generate_sematical_analysis(encoded_video)


def create_timestamped_errors(encoded_video, vertex, data):
    data['timelined_errors'] = vertex.generate_timestamped_errors(encoded_video)


@csrf_exempt
def api(request):
    # for file in request.FILES.values():
    #     with open(f'videos/{file.name}', 'wb+') as destination:
    #         destination.write(file.read())
    filenames = [file.file.file.name for file in request.FILES.values()]
    filename = filenames[0]

    data = {}

    sizes = [file.size for file in request.FILES.values()]
    t1 = Thread(target=create_transcription, args=[filename, data])
    t1.start()

    vertex = VertexAIAPI()
    encoded_video = base64.b64encode(open(filename, "rb").read()).decode("utf-8")

    t2 = Thread(target=create_semantic_analysis, args=[encoded_video, vertex, data])
    t2.start()

    t3 = Thread(target=create_timestamped_errors, args=[encoded_video, vertex, data])
    t3.start()

    t1.join()
    text = data['transcription_data'].text
    video_size = int(sizes[0] / 1024 / 1024)
    word_count = text.count(" ") + 1
    timestamp_transcription = [{'timestamp': segment.start, 'text': segment.text} for segment in data['transcription_data'].segments]

    data.pop('transcription_data')

    t2.join()
    t3.join()

    data |= {
        'keywords': data['chat'].get('klucze'),
        'questions': data['chat'].get('pytania'),
        'education_level': data['chat'].get('wyksztalcenie'),
        'interest_level': data['chat'].get('zainteresowanie'),
        'translation': data['chat'].get('eng'),
        'video_size': video_size,
        'word_count': word_count,
        'transcription': text,
        'timestamp_transcription': timestamp_transcription,
        'summary': data['chat'].get('podsumowanie')
    }

    return HttpResponse(content=json.dumps(data), content_type="application/json")


@csrf_exempt
def comparison(request):
    filenames = [file.file.file.name for file in request.FILES.values()]
    
    encoded_videos = [base64.b64encode(open(f, "rb").read()).decode("utf-8") for f in filenames]
    comparison = VertexAIAPI().generate_comparison(encoded_videos)

    data = {
        'comparison': comparison
    }

    return HttpResponse(content=json.dumps(data), content_type="application/json")