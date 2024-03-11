
from django.contrib import admin
from django.urls import path,include
from .views import run_fortran,__get__angle__values__,__get__k__vs__r__values__
urlpatterns = [
    path("run-fortran/",run_fortran.as_view()),
    path('__get__angle__values__/',__get__angle__values__.as_view()),
    path('__get__k__vs__r__values__/',__get__k__vs__r__values__.as_view()),
]
