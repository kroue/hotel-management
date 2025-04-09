from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomList, BookingListCreate, RoomViewSet, BookingViewSet, register
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('rooms/', RoomList.as_view()),
    path('bookings/', BookingListCreate.as_view()),
    path('register/', register, name='register'),
    path('api/', include(router.urls)),  # This line includes your API endpoints
    path('admin/', admin.site.urls),
    # Removed the duplicate include('hotel.urls')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)