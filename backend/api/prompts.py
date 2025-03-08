VERTEX_PROMPT = """
    Proszę przeanalizuj nagranie wideo i podaj momenty, które mogą wskazywać na to, że nagranie jest deep fake.
    Weż pod uwagę następujące rzeczy:
    a) Nienaturalne ruchy i pozycja ciała.
    b) Nienaturalne cienie.
    c) Zniekształcenia obrazu.
    d) Postawa ciała. Czy twarz jest skierowana nienaturalnie w stosunku do tłowia.
    e) Ruch głowy przy nieruchomym tłowiu i rękach.
    f) Całkowity brak ruchu tłowia.
    Odpowiedź ma zawierać tylko strukturę JSON w takim formacie { 'errors': [{'description': opis, 'timestamp': 00:00.000, positionX: X, positionY: Y, size:: Z}]}. Nie podawaj nic innego.
"""
