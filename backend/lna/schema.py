
import graphene

from graphene_django.types import DjangoObjectType

from lna.models import Exposure, Header

class ExposureType(DjangoObjectType):
    class Meta:
        model = Exposure

class HeaderType(DjangoObjectType):
    class Meta:
        model = Header

class Query(object):

    all_exposures = graphene.List(ExposureType)
    all_headers = graphene.List(HeaderType)

    def resolve_all_exposures(self, info, **kwargs):
        return Exposure.objects.all()

    def resolve_all_headers(self, info, **kwargs):
        return Header.objects.select_related('exposure').all()