from django.urls import path
from . import views
urlpatterns=[path("",views.home,name="home"),path("about/",views.about,name="about"),path("services/",views.services,name="services"),path("projects/",views.projects,name="projects"),path("projects/<slug:slug>/",views.project_detail,name="project_detail"),path("blog/",views.blog,name="blog"),path("blog/<slug:slug>/",views.blog_detail,name="blog_detail"),path("contact/",views.contact,name="contact"),path("start-a-project/",views.quote,name="quote"),path("newsletter/",views.newsletter,name="newsletter"),path("search/",views.search,name="search")]
