from django.contrib import admin
from .models import Room, Booking

class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'capacity', 'price_per_night', 'available', 'photo')  # Add available and photo columns
    search_fields = ('name', 'description')  # Allow searching by name and description
    list_filter = ('available',)  # Filter rooms by availability

class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'room', 'start_date', 'end_date', 'status')  # Show relevant booking information
    list_filter = ('status',)  # Filter by booking status

admin.site.register(Room, RoomAdmin)
admin.site.register(Booking, BookingAdmin)
