from rest_framework import viewsets

from api.models import Task
from api.serializers import TaskSerializer


class ToDoAPIViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
