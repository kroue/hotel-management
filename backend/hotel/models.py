from django.db import models
from django.contrib.auth.models import User

class Room(models.Model):
    number = models.CharField(max_length=10)
    type = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f'Room {self.number}'

class Booking(models.Model):
    guest = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()

    def __str__(self):
        return f'{self.guest.username} booked Room {self.room.number}'
