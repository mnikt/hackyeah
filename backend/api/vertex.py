import base64
import vertexai
import logging
import json

from vertexai.generative_models import GenerativeModel, Part
from api.secrets import PROJECT_ID

base_instruction = "Wyobraź sobie że jesteś doświadczonym mówcą, który obserwuje i analizuje mówców, którzy są na filmie. Twoim zadaniem jest wykryć błędy w tekście mówionym podczas filmu, gdzie mówca mówi w języku polskim. Przeanalizuj poniższy materiał filmowy i zidentyfikuj błędy opisane poniżej. Dla każdego zidentyfikowanego błędu podaj sygnaturę czasową, kiedy on wystąpił. Zidentyfikuj i opisz szczegółowo: "
prompt_suffix = "Odpowiedź ma zawierać tylko strukturę JSON w takim formacie {'kategoria błędu': [{category: kategoria błędu, timestamp: sygnatura czasowa, description: szczegółowe wyjaśnienie dla błędu}]}. Nie podawaj nic innego. Odpowiadaj zawsze według wyżej wymienionej struktury."

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

semantics_prompt = """
Proszę przeanalizuj poniższe nagranie pod kątem sentymentu wypowiedzi, uwzględniając ton głosu, ekspresję twarzy oraz wyrażane emocje. Podaj dla wypowiedzi:
Kategoryzację sentymentu: czy film jest pozytywny, neutralny czy negatywny.
Zidentyfikowane emocje: jakie emocje są wyrażane (np. radość, smutek, złość).
Opis tonu głosu: charakterystyka tonu głosu (np. ciepły, chłodny, agresywny, spokojny, podniosły).
Opis ekspresji twarzy: jakie wyrazy twarzy są widoczne (np. uśmiech, zmarszczone brwi, uniesione brwi, kontakt wzrokowy).
Wpływ na odbiór: jak sentyment i emocje wpływają na percepcję wypowiedzi przez odbiorcę.
Spójność z treścią: czy emocje i ton głosu są adekwatne do przekazywanej treści.

Odpowiedź ma zawierać tylko strukturę JSON w takim formacie {'voice': opis tonu głosu za pomocą jednego wyrazu, 'expression': opis ekspresji twarzy za pomocą jednego wyrazu, 'impact': wydźwięk wypowiedzi np. pozytywny lub negatywny na podstawie tekstu i ekspresji mówcy, 'integrity': emocje i ton głosu pasują do treści} Nie podawaj nic innego.
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
  
  def _extract_json(self, content: str):
    json_start_phrase = '```json'
    start = content.find(json_start_phrase) + len(json_start_phrase)
    end = content.find('```', start+1)
    
    return json.loads(content[start:end])
  
  def generate_timestamped_errors(self, base64_vid: str):
    logging.debug(f'file received')
  

    responses = []
    for prompt in [build_prompts(prompts_raw)[0]]:
      response = self._make_request(base64_vid, prompt)
      extracted = self._extract_json(response)
      responses.append(extracted)
    
    print(responses)
    
    return responses
  
  def generate_sematical_analysis(self, base64_vid: str):
    logging.debug('generate_semantical_analysis')
    
    response = self._make_request(base64_vid, semantics_prompt)
    
    extracted = self._extract_json(response)
    
    print('extracted: ', extracted)
    
    return extracted
    