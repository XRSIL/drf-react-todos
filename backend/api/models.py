from django.db import models
from django.utils import timezone


class Task(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название задачи')
    is_done = models.BooleanField(default=False, verbose_name='Выполнена')
    done_at = models.DateTimeField(default=None, blank=True, null=True, verbose_name='Когда выполнена')
    description = models.TextField(max_length=500, blank=True, null=True, verbose_name='Описание задачи')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Задача'
        verbose_name = 'Задачи'
        ordering = ('is_done', )

    def save(self, *args, **kwargs):
        if self.pk:
            task_instance = Task.objects.filter(pk=self.pk).first()
            if task_instance:
                if self.is_done and task_instance.is_done != self.is_done:
                    self.done_at = timezone.now()
                elif not self.is_done and task_instance.is_done != self.is_done:
                    self.done_at = None
        super().save(*args, **kwargs)
