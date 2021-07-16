from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
	openapi.Info(
		title = "Чат API",
		default_version = "v1",
		description="",
		license=openapi.License(name="BSD License"),
	),
	public=True,
	permission_classes=(permissions.AllowAny,),
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'helpers.authentication.TokenAuthentication',
    ),
    'DEFAULT_MODEL_SERIALIZER_CLASS': (
        'rest_framework.serializers.ModelSerializer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ),
}
urlpatterns = [
	path('swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name="schema-json"),
	path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"),
	path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name="schema-redoc"),
]
