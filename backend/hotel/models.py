from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import pre_save
from django.dispatch import receiver

class Room(models.Model):
    name = models.CharField(max_length=100, default='Unnamed Room')
    description = models.TextField(default='No description available')
    capacity = models.IntegerField(default=1)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    available = models.BooleanField(default=True)  # Track room availability
    photo = models.ImageField(upload_to='room_photos/', null=True, blank=True)  # Room photo

    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    status = models.CharField(
        max_length=20, 
        choices=[('confirmed', 'Confirmed'), ('pending', 'Pending'), ('cancelled', 'Cancelled')],
        default='pending'
    )

    def __str__(self):
        return f"{self.user.username} booking {self.room.name}"

# Signal to update room availability when a booking is made
@receiver(pre_save, sender=Booking)
def update_room_availability(sender, instance, **kwargs):
    # When a booking is being saved, set the room's availability to False (unavailable)
    if instance.status == 'confirmed':
        instance.room.available = False
        instance.room.save()

# Signal to update room availability when a booking is cancelled
@receiver(pre_save, sender=Booking)
def update_room_availability_on_cancel(sender, instance, **kwargs):
    # When a booking is cancelled, set the room's availability to True (available)
    if instance.status == 'cancelled' and instance.pk is not None:
        original_booking = Booking.objects.get(pk=instance.pk)
        if original_booking.status != 'cancelled':
            instance.room.available = True
            instance.room.save()
