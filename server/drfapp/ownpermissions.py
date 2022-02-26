from rest_framework import permissions

class ProfilePermission(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permission.SAFE_METHODS:
            return True
        return False