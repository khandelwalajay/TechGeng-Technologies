from django.db import models
class Service(models.Model):
 title=models.CharField(max_length=120); slug=models.SlugField(unique=True); short_description=models.CharField(max_length=240); description=models.TextField(); icon=models.CharField(max_length=12,default="✦"); featured=models.BooleanField(default=True); order=models.PositiveIntegerField(default=0)
 class Meta: ordering=["order","title"]
 def __str__(self): return self.title
class Project(models.Model):
 title=models.CharField(max_length=160); slug=models.SlugField(unique=True); category=models.CharField(max_length=80); summary=models.CharField(max_length=260); description=models.TextField(); technologies=models.CharField(max_length=400); featured=models.BooleanField(default=True); published=models.BooleanField(default=True); created_at=models.DateTimeField(auto_now_add=True)
 class Meta: ordering=["-created_at"]
 def __str__(self): return self.title
class BlogPost(models.Model):
 title=models.CharField(max_length=180); slug=models.SlugField(unique=True); excerpt=models.CharField(max_length=300); content=models.TextField(); published=models.BooleanField(default=True); created_at=models.DateTimeField(auto_now_add=True)
 class Meta: ordering=["-created_at"]
 def __str__(self): return self.title
class ContactMessage(models.Model):
 name=models.CharField(max_length=120); email=models.EmailField(); phone=models.CharField(max_length=30,blank=True); subject=models.CharField(max_length=180); message=models.TextField(); is_read=models.BooleanField(default=False); created_at=models.DateTimeField(auto_now_add=True)
 class Meta: ordering=["-created_at"]
class ProjectInquiry(models.Model):
 name=models.CharField(max_length=120); email=models.EmailField(); company=models.CharField(max_length=160,blank=True); phone=models.CharField(max_length=30,blank=True); service=models.CharField(max_length=120,blank=True); budget=models.CharField(max_length=80,blank=True); timeline=models.CharField(max_length=80,blank=True); details=models.TextField(); status=models.CharField(max_length=30,default="New"); created_at=models.DateTimeField(auto_now_add=True)
 class Meta: ordering=["-created_at"]
class NewsletterSubscriber(models.Model):
 email=models.EmailField(unique=True); active=models.BooleanField(default=True); subscribed_at=models.DateTimeField(auto_now_add=True)
