
from django.contrib import admin
from django.urls import path,include
from .views import __get__k__vs__r__value__,__get__theta__vs__t__values__
urlpatterns = [
    path("__get__k__vs__r__values__/",__get__k__vs__r__value__.as_view()),
    path("__get__theta__vs__t__values__/",__get__theta__vs__t__values__.as_view()),
]
