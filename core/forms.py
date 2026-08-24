from django import forms
from .models import ContactMessage,ProjectInquiry
class ContactForm(forms.ModelForm):
 class Meta: model=ContactMessage; fields=["name","email","phone","subject","message"]; widgets={"message":forms.Textarea(attrs={"rows":6})}
class InquiryForm(forms.ModelForm):
 class Meta: model=ProjectInquiry; fields=["name","email","company","phone","service","budget","timeline","details"]; widgets={"details":forms.Textarea(attrs={"rows":7})}
