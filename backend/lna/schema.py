
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


# class HeaderType(DjangoObjectType):
#     class Meta:
#         model = Header


class Query(object):

    exposure = Node.Field(ExposureNode)
    all_exposures = DjangoFilterConnectionField(ExposureNode)

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
