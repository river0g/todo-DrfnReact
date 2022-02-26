from django.shortcuts import render
from django.views.generic import ListView


# function based view
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from .models import Task, Member
from .serializers import TaskSerializer, UserSerializer, MemberSerializer
from .ownpermissions import ProfilePermission


class api4AllowAny(APIView):  # 講義外
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        members = Member.objects.all()
        selializer = MemberSerializer(members, many=True)
        return Response(selializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (AllowAny,) # これは誰でもなんでもできてしまう
    permission_classes = (ProfilePermission,) # これで認証がないUserはDeleteやPutなどができなくなる


class ManageUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # authentication_classesは認証方法を指定する。(token, JWTなど)
    authentication_classes = (TokenAuthentication,)
    # permission_classesはViewへのアクセス許可条件を指定する。(認証ユーザーのみ, Getアクセスのみなど)
    permission_classes = (IsAuthenticated,)
    # permission_classes = (AllowAny,)


class UpdateUserView(generics.RetrieveUpdateAPIView):  # 講義外
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
