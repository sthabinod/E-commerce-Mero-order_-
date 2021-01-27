from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.index,name="index"),
    path('fruits/',views.fruits,name="fruits"),
    path('vegetables/', views.vegetables, name="vegetables"),
    path('about_us/',views.about_us,name="about_us"),
    path('checkout/', include('checkout.urls')),
    path('cart/',views.cart,name="cart"),

]


