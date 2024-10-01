from minio import Minio
from api.secrets import MINIO_ADDRESS, MINIO_ACCESS_KEY, MINIO_SECRET_KEY


class S3Client:
    def __init__(self):
        self.client = Minio(MINIO_ADDRESS, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, secure=False)
        self.bucket = "textuntrap"
        self.files_count = 0

    def upload_file(self, filepath: str) -> str:
        self.files_count += 1
        self.client.fput_object(self.bucket, f'{self.files_count}_{filepath}', filepath)

        return self.client.presigned_get_object(self.bucket, f'{self.files_count}_{filepath}')
