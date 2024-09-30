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

