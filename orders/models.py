from django.db import models
from django.core.cache import cache

class Customer(models.Model):
    email = models.EmailField(blank=False)
    full_name = models.CharField(max_length=255,blank=False)
    phone = models.IntegerField(blank=False)
    address = models.CharField(max_length=255,blank=False)

    def __str__(self):
        return self.full_name

class Order(models.Model):
    order_date = models.DateField(blank=False, auto_now_add=True)
    customer = models.ForeignKey('Customer',on_delete=models.CASCADE)
    delivery_charge = models.IntegerField(blank=False)
    
    def __str__(self):
        return str(self.id)


class Delivery(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=False)
    total_price = models.DecimalField(decimal_places=2, max_digits=8, blank=False)
    product= models.ForeignKey('Product', on_delete=models.CASCADE)
    

    class Meta:
        verbose_name_plural = "Deliveries"
        unique_together = ['order_id', 'product_id']


    def __str__(self):
        return str(self.id)


class Category(models.Model):
    name = models.CharField(max_length=255, primary_key=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255, blank=False)
    image = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255)
    price = models.DecimalField(decimal_places=2, max_digits=8, blank=False)
    category = models.ForeignKey('Category',on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class SingletonModel(models.Model):
    class Meta:
        abstract=True

    def set_cache(self):
        cache.set(self.__class__.__name__, self)

    def delete(self, *args, **kwargs):
        pass

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)
        self.set_cache()

    @classmethod
    def load(cls):
        if cache.get(cls.__name__) is None:
            obj, created = cls.objects.get_or_create(pk=1)
            if not created:
                obj.set_cache()
        return cache.get(cls.__name__)


class Contact(SingletonModel):
    name = models.CharField(max_length=100,blank=False, null=False)
    address = models.CharField(max_length=100,blank=False)
    telephone = models.PositiveIntegerField(blank=False, null=True)
    email = models.EmailField(default='contactus@gmail.com')
    logo  = models.ImageField(upload_to='images/')
    description = models.TextField(blank=False, null=False)
    serviceOne = models.CharField(max_length=100,blank=False, null=False)
    serviceTwo = models.CharField(max_length=100,blank=False, null=False)
    serviceThree = models.CharField(max_length=100,blank=False, null=False)

    

