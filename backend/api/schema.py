import fits.schema

import graphene

from graphene_django.debug import DjangoDebug
class Query(
    fits.schema.Query,
    graphene.ObjectType):

    debug = graphene.Field(DjangoDebug, name='__debug')


schema = graphene.Schema(query=Query)
