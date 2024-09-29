import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from moviepy.video.io.VideoFileClip import VideoFileClip

from api.openai import OpenAIAPI
from api.vertex import VertexAIAPI


@csrf_exempt
def api(request):
    filenames = [file.file.file.name for file in request.FILES.values()]
    sizes = [file.size for file in request.FILES.values()]
    filename = filenames[0]

    # openai_responses = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]
    # print(openai_responses)
    
    timelined_errors = VertexAIAPI().generate_findings(filenames[0])


    video = VideoFileClip(filename)

    transcription_data = OpenAIAPI().get_file_transcription(video)
    # transcription_data = [OpenAIAPI().get_file_transcription(filename) for filename in filenames]

    errors = [
        {'text': "Typowy błąd byłby napisany tutaj z sugestią jakąś.", 'tag': "video", 'timestamp': "0:17s"},
        {'text': "Typowy błąd byłby napisany tutaj z sugestią jakąś.", 'tag': "audio", 'timestamp': "0:25s"},
        {'text': "Typowy błąd byłby napisany tutaj z sugestią jakąś.", 'tag': "text", 'timestamp': "0:40s"},
        {'text': "Typowy błąd byłby napisany tutaj z sugestią jakąś.", 'tag': "video", 'timestamp': "1:12s"},
        {'text': "Typowy błąd byłby napisany tutaj z sugestią jakąś.", 'tag': "audio", 'timestamp': "0:30s"},
    ]
    overall_score = 50
    video_duration = int(video.duration)
    video_size = int(sizes[0] / 1024 / 1024)
    word_count = transcription_data.text.count(" ") + 1
    chat = OpenAIAPI().make_chat_request(transcription_data.text)

    data = {
        'keywords': chat.get('slowa_kluczowe'),
        'questions': chat.get('pytania'),
        'education_level': chat.get('ocena_wyksztalcenie'),
        'interest_level': chat.get('ocena_zainteresowania'),
        'errors': errors,
        'overall_score': overall_score,
        'video_duration': video_duration,
        'video_size': video_size,
        'word_count': word_count,
        'transcription': transcription_data.text,
        'timelined_errors': timelined_errors,
        # 'transcription_timestamps': transcription_data.words,
        'summary': chat.get('podsumowanie')
    }

    return HttpResponse(content=json.dumps(data), content_type="application/json")
