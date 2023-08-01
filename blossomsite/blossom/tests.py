from django.test import TestCase
from django.urls import reverse
from blossom.apps import trie
from blossom.forms import LettersForm
from unittest.mock import MagicMock, patch

# Create your tests here.

class BlossomViewTests(TestCase):
    def test_without_request(self):
        url = reverse("blossom:index")
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "blossom/index.html")

    def test_with_valid_request(self):
        url = reverse("blossom:index")
        data = {
            "letters": "abcdef"
        }
        response = self.client.get(url, data=data)

        self.assertRedirects(response, "/words/abcdef")

    def test_with_invalid_request(self):
        url = reverse("blossom:index")
        data = {
            "letters": "12345"
        }
        response = self.client.get(url, data=data)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "blossom/index.html")

class BlossomFormTests(TestCase):
    def test_max_length(self):
        form = LettersForm(data={"letters": "abcdefgh"})
        self.assertEqual(
            form.errors["letters"], ["Ensure this value has at most 7 characters (it has 8)."]
        )
        self.assertEqual(form.is_valid(), False)


    def test_non_alpha_characters(self):
        form = LettersForm(data={"letters": "abcdef!"})
        self.assertEqual(
            form.errors["letters"], ["You must only enter letters"]
        )
        self.assertEqual(form.is_valid(), False)


    def test_lowercase_characters(self):
        form = LettersForm(data={"letters": "abcdef"})
        self.assertEqual(
            form.errors, {}
        )
        self.assertEqual(form.is_valid(), True)

    def test_uppercase_characters(self):
        form = LettersForm(data={"letters": "ABCDEF"})
        self.assertEqual(
            form.errors, {}
        )
        self.assertEqual(form.is_valid(), True)
        self.assertEqual(form.cleaned_data["letters"], "abcdef")




