from django.http import HttpResponse

def my_view(request):
    # ...

    print("hi")
    # Return a "created" (201) response code.
    return HttpResponse(status=201)