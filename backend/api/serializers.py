from rest_framework import serializers

from api.models import Task


class TaskSerializer(serializers.ModelSerializer):
    done_at = serializers.DateTimeField(format='%d.%m.%y %H:%M', read_only=True)
    created_at = serializers.DateTimeField(format='%d.%m.%y %H:%M', read_only=True)

    class Meta:
        fields = ('id', 'title', 'description', 'is_done', 'done_at', 'created_at')
        model = Task
