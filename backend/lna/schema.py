
import graphene

from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from lna.models import Exposure, Header


class ExposureNode(DjangoObjectType):
    class Meta:
        model = Exposure
        interfaces = (Node, )
        filter_fields = {
            'filename': ['iexact', 'icontains', 'istartswith'],
            'target': ['iexact', 'icontains', 'istartswith']
        }


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

    def resolve_telescopes(self, info):
        return [exposure.telescope for exposure in Exposure.objects.distinct('telescope').order_by('telescope')]

    def resolve_instruments(self, info):
        return [exposure.instrument for exposure in Exposure.objects.distinct('instrument').order_by('instrument')]

    def resolve_bands(self, info):
        return [exposure.band for exposure in Exposure.objects.distinct('band').order_by('band')]

    # all_telescopes = Node.Field(TelescopeNode)


    # def resolve_all_exposures(self, info, **kwargs):
    #     return Exposure.objects.all()

    # def resolve_all_headers(self, info, **kwargs):
    #     return Header.objects.select_related('exposure').all()


#  Exemplo de querys 
# query all_exposures {
# 	allExposures(target_Icontains: "mali", first:2) {
# 	  edges {
# 	    node {
# 	      id
#         filename
#         target
# 	    }
# 	  }
# 	} 
# }


# query get_exposure_by_id {
#   exposure (id:"RXhwb3N1cmVOb2RlOjgy"){
#     id
#     filename
#     target
#   }
# }
