from django import forms
from django.core.exceptions import ValidationError

class LettersForm(forms.Form):
    letters = forms.CharField(max_length=7)

    def clean_letters(self):
        data = self.cleaned_data["letters"]

        if not data.isalpha():
            raise ValidationError("You must only enter letters")
        
        return data.lower()
    