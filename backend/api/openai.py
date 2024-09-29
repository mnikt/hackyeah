import json

from moviepy.video.io.VideoFileClip import VideoFileClip
from openai import OpenAI
from api.secrets import OPENAI_API_KEY


class OpenAIAPI:
    def __init__(self):
        self.api_key = OPENAI_API_KEY
        self.client = OpenAI(api_key=self.api_key)

    def make_chat_request(self, text: str):
        # errors = self.client.chat.completions.create(
        #     model="gpt-4o-mini",
        #     messages=[
        #         {
        #             "role": "user",
        #             "content": f'''
        #             Masz za zadanie wykryć błędy w tekście, który Ci podam w znaczniku <>. Żeby to zrobić musisz wykorzystać następujące kroki:
        #             1. Powtórzenia tekstu to sytuacje gdzie słowa powtarzają się wiele razy np: "Zjadłem placki były smaczne, zjadłem placki bo były dobre". Jeżeli takie występują, wskaż konkretne miejsca w których wystąpiły powtórzenia tekstu. Nazwij ten błąd "powtórzenia tekstu".
        #             2. W tekście występuje nagła zmiana tematu, co powoduje niespójność wypowiedzi. Wskaż miejsca,  jeśli takie się pojawiają, gdzie wprowadzone są nowe, niepowiązane tematy bez wyraźnego przejścia lub kontekstu. Jeśli nie są to skrajne zmiany tematu - nie wskazuj. Nazwij ten błąd "nagła zmiana tematu".
        #             3. W tekście znajduje się zbyt duża ilość liczb. Wskaż miejsca, gdzie liczby pojawiają się w nadmiarze. Liczby te będą napisane cyframi np. "358,6". Nazwij ten błąd "zbyt duża ilośc liczb".
        #             4. W tekście może występować błędne lub nieadekwatne użycie słów, które zaburzają sens wypowiedzi. Wskaż te słowa. Przykładem jest "Kwadratowa rocznica". Wskaż miejsce, w którym występuje - tylko jeśli się pojawia. Nazwij ten błąd "błędne użycie słowa".
        #             5. W tekście mogą występować nadmiernie złożone terminy specjalistyczne (żargon), które mogą być trudne do zrozumienia dla osób spoza danej dziedziny. Wskaż miejsca, gdzie użyto zbyt skomplikowanego języka skupionego wokół dziedziny prawa. Nazwij ten błąd "żargon".
        #             6. W tekście mogą występować literówki, błędy ortograficzne lub błędnie zapisane wyrazy. Wskaż słowa, które zawierają błędy w pisowni. Przykładem jest słowo "relalizując" zamiast "realizując". Nazwij ten błąd "błędny zapis słowa".
        #             7. W tekście mogą występować zbyt liczne formy strony biernej. Wskaż miejsca, gdzie użyto strony biernej np. „wskazano”, „poruszono”, „podano”. Nie myl strony biernej z pierwszą osobą liczby mnogiej, np. "chcieliśmy", "uzyskamy". Nazwij ten błąd "forma bierna".
        #             8. W tekście mogą występować za długie, wielokrotnie złożone zdania. Wskaż zdania, które są powyżej trzykrotnie złożone. Nazwij ten błąd "wielokrotnie złożone zdania".
        #             9. W tekście mogą pojawiać się skróty, które mogą być niezrozumiałe dla czytelnika. Wskaż miejsca, gdzie użyto skrótów instytucji (np. KSeF). Nazwij ten błąd "brak rozwnięcia skrótu".
        #             Sformatuj każdy błąd w postaci: errors: {{category: kategoria, timestamp: MM:SS-MM:SS, description: Opis błędu i propozycja poprawki}}. Dla każdego błędu zaproponuj poprawkę. Sformatuj odpowiedź do formatu JSON. Nie rozpoczynaj odpowiedzi wyrazem json.
        #             <>{text}<>
        #             '''
        #         }
        #     ]
        # ).choices[0].message.content

        data = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": f'''
                    Dla tekstu podanego w znaczniku <> wykonaj kroki:
                    1. Przygotuj dwu-trzy zdaniowe tekstowe podsumowanie kluczowych przekazów wypowiedzi.  Wskaż najważniejsze informacje i wnioski, przedstawiając je w zwięzły sposób.
                    2. Na podstawie tekstu, przygotuj 10 merytorycznych pytań, które pomogą lepiej zrozumieć kluczowe informacje. Pytania powinny dotyczyć głównych tematów poruszonych w tekście. Zadaj pytania, na które można odpowiedzieć, dzięki przeczytaniu tekstu.
                    3. Oceń treść wideo pod względem dopasowania do trzech grup odbiorców o różnym poziomie wykształcenia: podstawowe, średnie i wyższe. Zwróć uwagę na użyty język, poziom skomplikowania informacji oraz sposób przekazywania treści. Napisz jednym słowem grupę odbiorców: podstawowe, średnie lub wyższe. Pole nazwij wyksztalcenie.
                    4. Oceń treść wideo pod względem dopasowania do trzech grup odbiorców o różnym poziomie zainteresowań: ogólne, akademickie i biznesowe. Zwróć uwagę na użyty język, poziom skomplikowania informacji oraz sposób przekazywania treści. Napisz jednym słowem grupę odbiorców: ogólne, akademickie, biznesowe. Pole nazwij zainteresowanie.
                    5. Podaj słowa kluczowe występujące w tekście. Pole nazwij klucze.
                    6. Przetłumacz tekst na angielski. Pole nazwij eng.
                    Sformatuj odpowiedź do formatu JSON. Nie rozpoczynaj odpowiedzi wyrazem json.
                    <>{text}<>
                    '''
                },
            ]
        ).choices[0].message.content

        return json.loads(data)

    def get_file_transcription(self, file):
        file = OpenAIAPI.video_to_audio(file)
        with open(file, "rb") as f:
            transcription = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=f,
                response_format="verbose_json",
                timestamp_granularities=["segment"]
            )

        return transcription

    @staticmethod
    def video_to_audio(video):
        video.audio.write_audiofile(f'{video.filename}.mp3', codec="mp3")
        return f'{video.filename}.mp3'
