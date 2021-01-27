from django.shortcuts import render, redirect, get_object_or_404
from orders.models import Customer, Product, Order, Delivery
from .email import send_message

# Create your views here.

def checkout(request):
    if request.method == 'GET':
        return render(request, 'checkout/checkout.html')
    else:
        name = request.POST['fullName']
        email = request.POST['email']
        number = request.POST['phoneNumber']
        address = request.POST['address']
        delivery = request.POST['deliveryCharge']
        ids = request.POST.getlist('id')
        quantities = request.POST.getlist('quantity')
        total_price = request.POST.getlist('total_price')
        customer = Customer.objects.create(email=email, full_name=name, phone=number, address=address)
        order = Order.objects.create(customer=customer, delivery_charge=delivery)
        for index, product_id in enumerate(ids):
            product = get_object_or_404(Product, pk=product_id)
            quantity = int(quantities[index])
            price = float(total_price[index])
            orderCompletion = Delivery.objects.create(order=order, quantity=quantity, total_price=price, product=product)
        send_message(email, name, order.id) #for sending the email
        # redirecting to the home page with the products available
        return redirect('/')

