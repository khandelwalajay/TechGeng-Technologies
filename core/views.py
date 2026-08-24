from django.contrib import messages
from django.db.models import Q
from django.shortcuts import get_object_or_404,redirect,render
from .models import Service,Project,BlogPost,ContactMessage,ProjectInquiry,NewsletterSubscriber
from .forms import ContactForm,InquiryForm
def home(r): return render(r,"home.html",{"services":Service.objects.filter(featured=True)[:6],"projects":Project.objects.filter(featured=True,published=True)[:3],"posts":BlogPost.objects.filter(published=True)[:3]})
def about(r): return render(r,"about.html")
def services(r): return render(r,"services.html",{"services":Service.objects.all()})
def projects(r): return render(r,"projects.html",{"projects":Project.objects.filter(published=True)})
def project_detail(r,slug): return render(r,"project_detail.html",{"project":get_object_or_404(Project,slug=slug,published=True)})
def blog(r): return render(r,"blog.html",{"posts":BlogPost.objects.filter(published=True)})
def blog_detail(r,slug): return render(r,"blog_detail.html",{"post":get_object_or_404(BlogPost,slug=slug,published=True)})
def contact(r):
 f=ContactForm(r.POST or None)
 if r.method=="POST" and f.is_valid(): f.save(); messages.success(r,"Message received. We will contact you soon."); return redirect("contact")
 return render(r,"contact.html",{"form":f})
def quote(r):
 f=InquiryForm(r.POST or None)
 if r.method=="POST" and f.is_valid(): f.save(); messages.success(r,"Project enquiry submitted successfully."); return redirect("quote")
 return render(r,"quote.html",{"form":f})
def newsletter(r):
 if r.method=="POST":
  email=r.POST.get("email","").strip().lower()
  if email: NewsletterSubscriber.objects.get_or_create(email=email)
  messages.success(r,"You are subscribed to TechGeng updates.")
 return redirect(r.POST.get("next") or "home")
def search(r):
 q=r.GET.get("q","").strip()
 return render(r,"search.html",{"q":q,"services":Service.objects.filter(Q(title__icontains=q)|Q(description__icontains=q)) if q else [],"projects":Project.objects.filter(Q(title__icontains=q)|Q(summary__icontains=q),published=True) if q else [],"posts":BlogPost.objects.filter(Q(title__icontains=q)|Q(excerpt__icontains=q),published=True) if q else []})
