from django.db import models
from django.contrib.auth.models import User

class Collection(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, related_name="collections", null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Card(models.Model):
    name = models.CharField(max_length=100)
    number = models.IntegerField()
    description = models.CharField(max_length=500, blank=True)
    user = models.ForeignKey(User, related_name="cards", on_delete=models.CASCADE, null=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)

    def __str__(self):
        return self.name