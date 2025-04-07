from rest_framework import generics, permissions
from .models import Room, Booking
from .serializers import RoomSerializer, BookingSerializer

class RoomList(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class BookingListCreate(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(guest=self.request.user)

    def perform_create(self, serializer):
        serializer.save(guest=self.request.user)
