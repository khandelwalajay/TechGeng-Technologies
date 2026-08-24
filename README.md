# TechtGeng Django Website

## Setup
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Admin: /admin/

## Git
git add .
git commit -m "Build Django website"
git push

## Vercel
Set DJANGO_SECRET_KEY, DJANGO_DEBUG=False, DJANGO_ALLOWED_HOSTS and DATABASE_URL. Use PostgreSQL for production.
