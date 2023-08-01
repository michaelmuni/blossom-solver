from django.shortcuts import render, redirect, reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from blossom.apps import trie
from blossom.forms import LettersForm

# Create your views here.
def index(request):
    if request.GET:
        form = LettersForm(request.GET)
        if form.is_valid():
            return redirect(reverse('blossom:words', args=(form.cleaned_data["letters"],)))
    
    form = LettersForm()
        
    return render(request, "blossom/index.html", {"form": form})

def words(request, letters):
    words = trie.find_all_words_with_letters(letters)

    context = {
        "letters": letters,
        "words": words
    }
    return render(request, "blossom/words.html", context)

@api_view(['GET'])
def word_list(request, letters):
    words = trie.find_all_words_with_letters(letters)

    return Response(words)





