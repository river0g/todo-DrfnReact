from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import TaskViewSet, UserViewSet, ManageUserView, UpdateUserView, api4AllowAny

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('myself/', ManageUserView.as_view(), name='myself'),
    path('putself/', UpdateUserView.as_view(), name='putself'),
    path('getfn/', api4AllowAny.as_view(), name='getData'),
    path('', include(router.urls)),
]
