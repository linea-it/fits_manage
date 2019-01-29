import graphene

from graphene_django.debug import DjangoDebug

import lna.schema


class Query(
        lna.schema.Query,
        graphene.ObjectType):

    debug = graphene.Field(DjangoDebug, name='__debug')


schema = graphene.Schema(query=Query)
