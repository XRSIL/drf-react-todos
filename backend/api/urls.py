from rest_framework.routers import DefaultRouter

from api.views import ToDoAPIViewSet

router = DefaultRouter()

router.register(r'tasks', ToDoAPIViewSet, basename='tasks')

urlpatterns = router.urls
