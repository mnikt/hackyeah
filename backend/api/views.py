import json

from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from api.s3 import S3Client
from api.video_processor import VideoProcessor

video_processor = VideoProcessor()
s3_client = S3Client()


@csrf_exempt
def api(request: WSGIRequest) -> HttpResponse:
    file = request.FILES['file_0']
    filename = file.file.file.name
    filesize = int(file.size / 1024 / 1024)

    data = video_processor.get_video_data(filename) | {
        'video_size': filesize,
        'video_url': s3_client.upload_file(filename)
    }

    return HttpResponse(content=json.dumps(data), content_type="application/json")


@csrf_exempt
def comparison(request: WSGIRequest) -> HttpResponse:
    filenames = [file.file.file.name for file in request.FILES.values()]

    data = {
        'comparison': video_processor.get_videos_comparison(filenames)
    }

    return HttpResponse(content=json.dumps(data), content_type="application/json")
