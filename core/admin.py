from django.contrib import admin
from .models import *
admin.site.register([Service,Project,BlogPost,ContactMessage,ProjectInquiry,NewsletterSubscriber])
admin.site.site_header="TechtGeng Technologies & Solutions"
admin.site.site_title="TechtGeng Admin"
