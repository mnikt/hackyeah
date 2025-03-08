VERTEX_PROMPT = """
    Proszę przeanalizuj nagranie wideo i podaj momenty, które mogą wskazywać na to, że nagranie jest deep fake.
    Weż pod uwagę następujące rzeczy:
    a) Nienaturalne ruchy osób.
    b) Nienaturalne cienie.
    c) Zniekształcenia obrazu.
    Odpowiedź ma zawierać tylko strukturę JSON w takim formacie { 'errors': [{'description': opis, 'timestamp': sygnatura czasowa}]}. Nie podawaj nic innego.
"""
