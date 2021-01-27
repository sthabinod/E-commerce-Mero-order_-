from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Product

def index(request):
    products = Product.objects.all()
    return render(request, 'orders/index.html', {'products':products })


def fruits(request):
    fruit_products = Product.objects.filter(category="Fruits")
    return render(request, 'orders/pages/fruits.html', {'products': fruit_products })

def vegetables(request):
    veg_products = Product.objects.filter(category="Vegetables")
    return render(request, 'orders/pages/vegetables.html', {'products': veg_products })

def about_us(request):
    return render(request,'orders/pages/about_us.html')

def cart(request):
    return render(request,'orders/pages/cart.html')

