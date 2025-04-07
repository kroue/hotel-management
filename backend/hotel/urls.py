from django.urls import path
from .views import RoomList, BookingListCreate

urlpatterns = [
    path('rooms/', RoomList.as_view()),
    path('bookings/', BookingListCreate.as_view()),
]
