from django.contrib import admin
from .models import Customer, Product, Delivery, Category, Order, Contact
from django.contrib.auth.models import Group


class OrderCustomerInline(admin.TabularInline):
    model = Delivery
    raw_id_fields = ['order']

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'phone', 'address')
    search_fields = ['full_name']

    # change_list_template = 'admin/customer/customer_change.html'

    #change_list_template = '/admin/customer/customer_change.html'



class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'image', 'description', 'price', 'category_id']
    search_fields = ['name']


class OrderAdmin(admin.ModelAdmin):

    list_display = ['id', 'customer_email', 'order_date']

    list_display = ['id', 'customer_id', 'order_date']

    # search_fields = ['id']


class DeliveryAdmin(admin.ModelAdmin):
    list_display = ['product_id','quantity','total_price','order_id']
    # search_fields = ['order_id','product_id']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

# registered to admin
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Delivery,DeliveryAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(Contact)


admin.site.site_header = "Mero Order"
admin.site.site_title = "Mero Order admin"
admin.site.index_title = "Mero Order Adminstration"
