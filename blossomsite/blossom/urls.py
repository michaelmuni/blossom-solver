from django.urls import path

from . import views

app_name = 'blossom'
urlpatterns = [
    path("", views.index, name="index"),
    path("words/<str:letters>", views.words, name="words"),
    path("wordlist/<str:letters>", views.word_list, name="wordlist"),
    path("squaredle/words", views.squaredle_list, name="squaredelist")
]