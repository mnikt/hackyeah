CHAT_PROMPT = f'''
    Dla tekstu podanego w znaczniku <> wykonaj kroki:
    1. Przygotuj dwu-trzy zdaniowe tekstowe podsumowanie kluczowych przekazów wypowiedzi.  Wskaż najważniejsze informacje i wnioski, przedstawiając je w zwięzły sposób.
    2. Na podstawie tekstu, przygotuj 10 merytorycznych pytań, które pomogą lepiej zrozumieć kluczowe informacje. Pytania powinny dotyczyć głównych tematów poruszonych w tekście. Zadaj pytania, na które można odpowiedzieć, dzięki przeczytaniu tekstu.
    3. Oceń treść wideo pod względem dopasowania do trzech grup odbiorców o różnym poziomie wykształcenia: podstawowe, średnie i wyższe. Zwróć uwagę na użyty język, poziom skomplikowania informacji oraz sposób przekazywania treści. Napisz jednym słowem grupę odbiorców: podstawowe, średnie lub wyższe. Pole nazwij wyksztalcenie.
    4. Oceń treść wideo pod względem dopasowania do trzech grup odbiorców o różnym poziomie zainteresowań: ogólne, akademickie i biznesowe. Zwróć uwagę na użyty język, poziom skomplikowania informacji oraz sposób przekazywania treści. Napisz jednym słowem grupę odbiorców: ogólne, akademickie, biznesowe. Pole nazwij zainteresowanie.
    5. Podaj słowa kluczowe występujące w tekście. Pole nazwij klucze.
    6. Przetłumacz tekst na angielski. Pole nazwij eng.
    Sformatuj odpowiedź do formatu JSON. Nie rozpoczynaj odpowiedzi wyrazem json.
    <>$text$<>
'''

VERTEX_COMPARISON_PROMPT = """
    Proszę przeanalizuj i porównaj dwa poniższe nagrania wideo pod kątem występowania następujących błędów. Dla każdego błędu zidentyfikuj jego obecność w obu nagraniach, podaj sygnatury czasowe oraz opisz, w którym nagraniu występuje częściej lub jest bardziej widoczny. Uwzględnij zarówno nagranie, jak i treść transkrypcji.
    Lista błędów do analizy:
    a) Przerywniki: użycie zbędnych słów lub dźwięków typu 'yyy', 'eee', które zakłócają płynność wypowiedzi.
    b) Zbyt szybkie tempo mówienia: sytuacje, w których mówca mówi za szybko, utrudniając zrozumienie.
    c) Powtórzenia: powtarzanie tych samych słów lub fraz bez potrzeby.
    d) Zmiana tematu wypowiedzi: niespodziewane lub nieuzasadnione przechodzenie z jednego tematu na inny.
    e) Za dużo liczb: nadmierne użycie liczb, które mogą przytłaczać odbiorcę.
    f) Za długie, trudne słowa, zdania: używanie zbyt skomplikowanych wyrażeń lub złożonych zdań, które utrudniają zrozumienie.
    g) Żargon: używanie terminologii specjalistycznej niezrozumiałej dla szerokiego grona odbiorców.
    h) Obcy język: nieadekwatne wtrącanie słów lub zwrotów w obcym języku.
    i) Za długa pauza: niepotrzebne, długie przerwy w mówieniu, które zaburzają rytm wypowiedzi.
    j) Mówienie głośniej: używanie zbyt wysokiego poziomu głośności, co może być niekomfortowe dla słuchacza.
    k) Mówienie za cicho lub szeptem: wypowiedź jest zbyt cicha i trudna do usłyszenia.
    l) Drugi plan – inna osoba na planie: obecność innych osób w tle, które rozpraszają uwagę odbiorcy.
    m) Odwracanie się, przekręcanie, gestykulacja: nadmierne ruchy i gesty mówcy, które odciągają uwagę od treści.
    n) Mimika: nieadekwatne wyrazy twarzy lub brak mimiki wpływające na przekaz emocjonalny.
    o) Nieprawdziwe słowa: używanie słów lub informacji, które są nieprawdziwe lub wprowadzają w błąd.
    p) Niezgodność wypowiedzi z transkrypcją: różnice między mówioną treścią a dostarczoną transkrypcją.
    q) Szum: obecność zakłóceń dźwięków
    Odpowiedź ma zawierać tylko strukturę JSON w takim formacie {'nazwa pliku': {'nazwa błędu': {'timestamp': sygnatura czasowa, 'description': 'opis problemu'}}} Nie podawaj nic innego.
"""

VERTEX_SEMANTICS_PROMPT = """
    Proszę przeanalizuj poniższe nagranie pod kątem sentymentu wypowiedzi, uwzględniając ton głosu, ekspresję twarzy oraz wyrażane emocje. Podaj dla wypowiedzi:
    Kategoryzację sentymentu: czy film jest pozytywny, neutralny czy negatywny.
    Zidentyfikowane emocje: jakie emocje są wyrażane (np. radość, smutek, złość).
    Opis tonu głosu: charakterystyka tonu głosu (np. ciepły, chłodny, agresywny, spokojny, podniosły).
    Opis ekspresji twarzy: jakie wyrazy twarzy są widoczne (np. uśmiech, zmarszczone brwi, uniesione brwi, kontakt wzrokowy).
    Wpływ na odbiór: jak sentyment i emocje wpływają na percepcję wypowiedzi przez odbiorcę.
    Spójność z treścią: czy emocje i ton głosu są adekwatne do przekazywanej treści.
    
    Odpowiedź ma zawierać tylko strukturę JSON w takim formacie {'voice': opis tonu głosu za pomocą jednego wyrazu, 'expression': opis ekspresji twarzy za pomocą jednego wyrazu, 'impact': wydźwięk wypowiedzi np. pozytywny lub negatywny na podstawie tekstu i ekspresji mówcy, 'integrity': emocje i ton głosu pasują do treści} Nie podawaj nic innego.
"""

VERTEX_ERRORS_PROMPTS = [
    f'''
        Wyobraź sobie że jesteś doświadczonym mówcą, który obserwuje i analizuje mówców, którzy są na filmie. Twoim zadaniem jest wykryć błędy w tekście mówionym podczas filmu, gdzie mówca mówi w języku polskim. Przeanalizuj poniższy materiał filmowy i zidentyfikuj błędy opisane poniżej. Dla każdego zidentyfikowanego błędu podaj sygnaturę czasową, kiedy on wystąpił. Zidentyfikuj i opisz szczegółowo:
        {prompt}
        Odpowiedź ma zawierać tylko strukturę JSON w takim formacie {{"kategoria błędu": [{{category: kategoria błędu, timestamp: sygnatura czasowa, description: szczegółowe wyjaśnienie dla błędu}}]}}. Nie podawaj nic innego. Odpowiadaj zawsze według wyżej wymienionej struktury.
    ''' for prompt in [
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

        'Powtórzenia tekstu to sytuacje gdzie słowa powtarzają się wiele razy np: "Zjadłem placki były smaczne, zjadłem placki bo były dobre". Jeżeli takie występują, wskaż konkretne miejsca w których wystąpiły powtórzenia tekstu. Nazwij ten błąd "powtórzenia tekstu".',
        'Nagła zmiana tematu, która powoduje niespójność wypowiedzi. Wskaż miejsca,  jeśli takie się pojawiają, gdzie wprowadzone są nowe, niepowiązane tematy bez wyraźnego przejścia lub kontekstu. Jeśli nie są to skrajne zmiany tematu - nie wskazuj. Nazwij ten błąd "nagła zmiana tematu".',
        'Zbyt duża ilość liczb. Wskaż miejsca, gdzie liczby pojawiają się w nadmiarze. Liczby te będą napisane cyframi np. "358,6". Nazwij ten błąd "zbyt duża ilośc liczb".',
        'Błędne lub nieadekwatne użycie słów: które zaburzają sens wypowiedzi. Wskaż te słowa. Przykładem jest "Kwadratowa rocznica". Wskaż miejsce, w którym występuje - tylko jeśli się pojawia. Nazwij ten błąd "błędne użycie słowa".',
        'Nadmiernie złożone terminy specjalistyczne (żargon), które mogą być trudne do zrozumienia dla osób spoza danej dziedziny. Wskaż miejsca, gdzie użyto zbyt skomplikowanego języka skupionego wokół dziedziny prawa. Nazwij ten błąd "żargon".',
        'Literówki, błędy ortograficzne lub błędnie zapisane wyrazy. Wskaż słowa, które zawierają błędy w pisowni. Przykładem jest słowo "relalizując" zamiast "realizując". Nazwij ten błąd "błędny zapis słowa".',
        'Za długie, wielokrotnie złożone zdania: Wskaż zdania, które są powyżej trzykrotnie złożone. Nazwij ten błąd "wielokrotnie złożone zdania".',
        'Skróty, które mogą być niezrozumiałe dla czytelnika. Wskaż miejsca, gdzie użyto skrótów instytucji (np. KSeF). Nazwij ten błąd "brak rozwnięcia skrótu".'
    ]
]
