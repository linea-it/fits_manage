from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.db import connection
import os
import csv
from lna.models import Header, Exposure
import json
import pandas as pd


class Command(BaseCommand):

    count_files = 0
    header_created = 0
    header_updated = 0
    failed = 0
    success = 0

    def add_arguments(self, parser):

        # Nome do arquivo csv que sera importado
        parser.add_argument(
            'path', type=str, help='path to the directory where the json with the headers are to be imported. this directory must be in / archive.')

        parser.add_argument(
            '--constraint',
            action='store_true',
            dest='constraint',
            help='Only records headers for exposures that are already registered.',
        )

        # Apaga todas os registros antes de incluir novos
        parser.add_argument(
            '--delete',
            action='store_true',
            dest='delete',
            help='Delete all before creating new ones',
        )

    def delete(self):

        self.stdout.write("Removing records")
        count = Header.objects.count()

        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM %s" % Header._meta.db_table)

        self.stdout.write("Removed %s records" % count)

    def create_record(self, filepath):
        # self.stdout.write("Data: [ %s ]" % (data))
        try:
            with open(os.path.join(filepath)) as f:
               
                data = json.load(f)

                filename = os.path.basename(filepath)

                c_headers = 0

                e_filename = os.path.splitext(filename)[0]
                exposure = Exposure.objects.get(
                    filename='%s.fits' % e_filename)

                for name in data:

                    value = data[name]
                    if isinstance(value, str):

                        value = value.replace('\n', ' ').strip()
                        if value == '':
                            value = None

                    record, created = Header.objects.update_or_create(
                        exposure=exposure,
                        name=name,
                        defaults={
                            'value': value,
                        })

                    if created:
                        self.header_created += 1
                    else:
                        self.header_updated += 1

                    c_headers += 1

                self.success += 1
                self.stdout.write(
                    "SUCCESS: [ %s ] Headers [ %s ]" % (filename, c_headers))

        except Exception as e:
            self.stdout.write("FAILED: [ %s ] Error [ %s ]" % (filename, e))
            self.failed += 1

    def handle(self, *args, **options):

        if options['delete']:
            if settings.DEBUG:
                self.stdout.write(
                    "Deleting All entries before insert new ones")
                self.delete()
            else:
                self.stdout.write(
                    "Production environment delete option ignored.")

        directory = os.path.join(settings.ARCHIVE_DIR,
                                 os.path.basename(options['path']))

        self.stdout.write(directory)

        if not os.path.isdir(directory):
            self.stdout.write("Directory not found")

        if options['constraint']:
            exposures = Exposure.objects.all()

            for exposure in exposures:
                filename = exposure.filename.replace('.fits', '.json')
                self.stdout.write("Importing file: %s" % filename)

                filepath = os.path.join(directory, filename)

                if os.path.exists(filepath):
                    self.create_record(filepath)
                else:
                    self.stdout.write("File does not exist: %s" % filepath)

        else:
            for filename in os.listdir(directory):
                if filename.endswith(".json"):
                    self.count_files += 1
                    self.stdout.write("Importing file: %s" % filename)

                    filepath = os.path.join(directory, filename)
                    self.create_record(filepath)

        self.stdout.write("Files: [ %s ] Success: [ %s ] Failed: [ %s ] HeaderCreated: [ %s ] HeaderUpdated: [ %s ] " % (
            self.count_files, self.success, self.failed, self.header_created, self.header_updated))
