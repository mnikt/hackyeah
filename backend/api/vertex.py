import base64
import vertexai
import logging
import json

from vertexai.generative_models import GenerativeModel, Part
from api.secrets import PROJECT_ID

base_instruction = "Wyobraź sobie że jesteś doświadczonym mówcą, który obserwuje i analizuje mówców, którzy są na filmie. Twoim zadaniem jest wykryć błędy w tekście mówionym podczas filmu, gdzie mówca mówi w języku polskim. Przeanalizuj poniższy materiał filmowy i zidentyfikuj błędy opisane poniżej. Dla każdego zidentyfikowanego błędu podaj sygnaturę czasową, kiedy on wystąpił. Zidentyfikuj i opisz szczegółowo: "
prompt_suffix = "Odpowiedź ma zawierać tylko strukturę JSON w takim formacie {'Kategoria': [{timestamp: sygnatura czasowa, description: szczegółowe wyjaśnienie dla błędu}]}. Nie podawaj nic innego. Odpowiadaj zawsze według wyżej wymienionej struktury."

def build_prompts(prompts):
  enhanced_prompts = []
  for prompt in prompts:
    enhanced_prompts.append(f'{base_instruction}\n {prompt}\n {prompt_suffix}')
    
  return enhanced_prompts

prompts_raw = [
  'Przerywniki: użycie zbędnych słów lub dźwięków typu "yyy", "eee", które mogą zakłócać płynność wypowiedzi.',
  'Tempo mówienia: sytuacje, w których mówca mówi szybciej niż zwykle. Szybkie tempo mówienia można zidentyfikować poprzez zwiększoną ilość wypowiedzianych słów w danym przedziale czasu.',
  'Powtórzenia: powtarzanie tych samych słów lub fraz (pod rząd), np. "identyfikacja oraz przypisanie tagu, identyfikacja oraz przypisanie tagu"',
  'Pauzy: długie przerwy w mówieniu, które mogą zaburzać rytm wypowiedzi.',
  'Głośność: gdy poziom głośności jest wyższy lub niższy niż średnia',
  'Szum: Obecność zakłóceń dźwiękowych. Zakłócenia są dźwiękami, które nie są słowami i występują w tle',
  'Ackentowanie: ',
  'Semantyka angielskiego: (np. "European Union"): niepoprawne użycie angielskich terminów lub kalk językowych w kontekście polskiej wypowiedzi',
  'Drugi plan – inna osoba na planie: obecność innych osób w tle',
  'Ruchy: ruchy i gesty mówcy, takie jak wiercenie się, machanie rękoma, nadmierna gestykulacja',
  'Mimika: nieadekwatne wyrazy twarzy lub brak mimiki takie "jak szeroko otwarte usta", "wielki uśmiech"',
  'Niezgodność wypowiedzi z transkrypcją: sytuacje, w których mówiona treść nie odpowiada wyświetlanej na filmie transkrypcji',
  'Używanie strony biernej: nadmierne stosowanie strony biernej, np. "podano", "wskazano", "podsumowano", co może utrudniać zrozumienie i osłabiać przekaz wypowiedzi',
]


prompt_large = """

Wyobraź sobie że jesteś doświadczonym mówcą, który obserwuje i analizuje mówców, którzy są na filmie. Twoim zadaniem jest wykryć błędy w tekście mówionym podczas filmu, gdzie mówca mówi w języku polskim. Proszę przeanalizuj poniższy materiał filmowy i zidentyfikuj wszystkie możliwe błędy. Dla każdego zidentyfikowanego błędu podaj sygnaturę czasową, kiedy on wystąpił. Zidentyfikuj i opisz szczegółowo:
Przerywniki: użycie zbędnych słów lub dźwięków typu 'yyy', 'eee', które mogą zakłócać płynność wypowiedzi.
Zbyt szybkie tempo mówienia: sytuacje, w których mówca mówi za szybko, co może utrudniać zrozumienie.
Powtórzenia w mowie: powtarzanie tych samych słów lub fraz (pod rząd), np. 'identyfikacja oraz przypisanie tagu, identyfikacja oraz przypisanie tagu', co może świadczyć o braku płynności lub przygotowania.
Za długa pauza: niepotrzebne, długie przerwy w mówieniu, które mogą zaburzać rytm wypowiedzi.
Mówienie zbyt głośno: gdy poziom głośności jest za wysoki, co może być niekomfortowe dla słuchacza.
Mówienie za cicho lub szeptem: gdy wypowiedź jest zbyt cicha i trudna do usłyszenia.
Szum: obecność zakłóceń dźwiękowych lub hałasu w tle, które utrudniają odbiór.
Akcentowanie: niewłaściwe akcentowanie słów lub zdań, które może zmieniać znaczenie wypowiedzi.
Semantyka angielskiego (np. 'European Union'): niepoprawne użycie angielskich terminów lub kalk językowych w kontekście polskiej wypowiedzi.
Drugi plan – inna osoba na planie: obecność innych osób w tle, które mogą rozpraszać uwagę odbiorcy.
Odwracanie się, przekręcanie, nadmierna gestykulacja: ruchy i gesty mówcy, które mogą odciągać uwagę od treści.
Mimika: nieadekwatne wyrazy twarzy lub brak mimiki, co wpływa na przekaz emocjonalny.
Niezgodność wypowiedzi z transkrypcją: sytuacje, w których mówiona treść nie odpowiada wyświetlanej na filmiku transkrypcji.
Używanie strony biernej: nadmierne stosowanie strony biernej, np. 'podano', 'wskazano', 'podsumowano', co może utrudniać zrozumienie i osłabiać przekaz wypowiedzi.
Podaj szczegółowe wyjaśnienia dla każdego błędu, wraz z sygnaturą czasową. Odpowiadaj zawsze według wyżej wymienionej struktury.

 
Sformatuj odpowiedź jako struktura JSON w ten sposób: "Kategoria": [{timestamp: sygnatura czasowa, description: szczegółowe wyjaśnienie dla błędu}]
"""

class VertexAIAPI:
  def __init__(self) -> None:    
    vertexai.init(project=PROJECT_ID, location="us-central1")

    self.vision_model = GenerativeModel("gemini-1.5-pro-002")
    
  def _make_request(self, file_encoded: str, prompt: str):
    part = Part.from_data(
      data=base64.b64decode(file_encoded), mime_type="video/mp4"
    )
    
    response = self.vision_model.generate_content([part,prompt])
      
    logging.debug(f'response: {response.text}')
    return response.text
  
  def _parse_video_to_base64(self, path: str):
    # Read the video file in binary mode
    with open(path, "rb") as file:
        # Convert the binary content of the file to base64
      encoded_string = base64.b64encode(file.read())

    return encoded_string
  
  def generate_findings(self, file_path: str):
    logging.debug(f'file received: {file_path}')
  
    encoded_video = base64.b64encode(open(file_path, "rb").read()).decode("utf-8")

    responses = []
    for prompt in build_prompts(prompts_raw)[0]:
      response = self._make_request(encoded_video, prompt)
      
      json_start_phrase = '```json'
      start = response.find(json_start_phrase) + len(json_start_phrase)
      end = response.find('```', start+1)
      responses.append(json.loads(response[start:end]))
    
    
    print(responses)
    
    return responses