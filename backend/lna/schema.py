
import graphene

from graphene import Node, Connection
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType
from lna.models import Exposure, Header


class ExposureConnection(Connection):
    total_count = graphene.String()

    class Meta:
        abstract = True

    def resolve_total_count(self, info):
        return self.length

class ExposureNode(DjangoObjectType):
    class Meta:
        model = Exposure
        interfaces = (Node, )
        connection_class = ExposureConnection
        filter_fields = {
            'filename': ['iexact', 'icontains', 'istartswith'],
            'target': ['iexact', 'icontains', 'istartswith'],
            'telescope': ['iexact'],
            'instrument': ['iexact'],
            'band': ['iexact'],
            'exposure_time':['gte'],
            'observer': ['iexact', 'icontains', 'istartswith'],
        }

    have_headers = graphene.Boolean()
    def resolve_have_headers(self, info):
        if self.headers.count() > 0:
            return True
        return False

class HeaderNode(DjangoObjectType):
    class Meta:
        model = Header
        interfaces = (Node, )
        filter_fields = {
            'exposure',
        }



class Query(object):

    exposure = Node.Field(ExposureNode)
    exposures = DjangoFilterConnectionField(ExposureNode)
    headers = DjangoFilterConnectionField(HeaderNode)
    telescopes = graphene.List(graphene.String)
    instruments = graphene.List(graphene.String)
    bands = graphene.List(graphene.String)
    exposure_times = graphene.List(graphene.Float)
    exposure_count = graphene.Int()

    def resolve_telescopes(self, info):
        return [exposure.telescope for exposure in Exposure.objects.distinct('telescope').order_by('telescope')]

    def resolve_instruments(self, info):
        return [exposure.instrument for exposure in Exposure.objects.distinct('instrument').order_by('instrument')]

    def resolve_bands(self, info):
        return [exposure.band for exposure in Exposure.objects.distinct('band').order_by('band')]

    def resolve_exposure_times(self, info):
        return [exposure.exposure_time for exposure in Exposure.objects.distinct('exposure_time').order_by('exposure_time')]

    def resolve_exposure_count(self, info):
        return Exposure.objects.count()

