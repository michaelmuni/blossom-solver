from django.apps import AppConfig
from nltk.corpus import words
from blossom.classes.trie import Trie
import json

class BlossomConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blossom'

    def ready(self):
        global trie
        trie = Trie()

        wordlist = []   
        with open("..\wordlist_proper.txt", encoding="utf-8") as file:
            for line in file:
                stripped_line = line.rstrip()
                if stripped_line.isalpha(): 
                    wordlist.append(stripped_line)

        trie.insert_word_list(wordlist)

