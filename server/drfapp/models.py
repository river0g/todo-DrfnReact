from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title + ' : ' + self.author
    
class Member(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name