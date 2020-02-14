from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from django.db import connection
import os
import csv
from lna.models import Exposure, Header

import pandas as pd


class Command(BaseCommand):

    def add_arguments(self, parser):

        # Nome do arquivo csv que sera importado
        parser.add_argument(
            'filename', type=str, help='Name the csv file with the list of Headers to be inserted. the file must be in the archive directory.')

        # Apaga todas os registros antes de incluir novos
        parser.add_argument(
            '--limit',
            nargs='?',
            type=int,
            default=None,
            help='Limits the amount of records that will be imported. useful for testing and development. example --limit 1000',
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
        count = Exposure.objects.count()

        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM %s" % Header._meta.db_table)
            cursor.execute("DELETE FROM %s" % Exposure._meta.db_table)

        self.stdout.write("Removed %s records" % count)

    def convert_ra_sex_to_deg(self, ra):

        H, M, S = [float(i) for i in ra.split(':')]

        result = (H + M/60. + S/3600.)*15.

        return float(result)

    def convert_dec_sex_to_deg(self, dec):
        ds = 1

        D, M, S = [float(i) for i in dec.split(':')]
        if str(D)[0] == '-':
            ds, D = -1, abs(D)

        result = ds*(D + M/60. + S/3600.)

        return float(result)

    def create_record(self, row):
        try:

            exposure, created = Exposure.objects.update_or_create(
                filename=row.filename,
                file_path=os.path.join(row.path, row.filename),
                defaults={
                    # 'date': row.date,
                    'date_obs': row.date_obs,
                    'target': row.object,
                    'ra_deg': self.convert_ra_sex_to_deg(row.ra),
                    'dec_deg': self.convert_dec_sex_to_deg(row.dec),
                    'ra': row.ra,
                    'dec': row.dec,
                    'band': row.filter,
                    'exposure_time': float(str(row.exposure).replace(',', '.')),
                    'telescope': row.telescop,
                    'instrument': row.instrume,
                    'observer': row.observer,
                    'file_type': os.path.splitext(row.filename)[1],
                    'file_size': row.file_size,
                })

            if created:
                self.stdout.write("Created: [ %s ] ID [ %s ]" % (row.filename, exposure.id))
            else:
                self.stdout.write("Updated: [ %s ] ID [ %s ]" % (row.filename, exposure.id))

        except Exception as e:
            self.stdout.write("FAILED: [ %s ] Error [ %s ]" % (row.filename, e))
            # raise(e)

    def handle(self, *args, **options):

        if options['delete']:
            if settings.DEBUG:
                self.stdout.write(
                    "Deleting All entries before insert new ones")
                self.delete()
            else:
                self.stdout.write(
                    "Production environment delete option ignored.")

        filename = options['filename']

        file_path = os.path.join(settings.ARCHIVE_DIR,
                                 os.path.basename(filename))

        self.stdout.write("Filepath: %s" % file_path)
        self.stdout.write("Limit: %s" % options['limit'])

        if not os.path.exists(file_path):
            self.stdout.write("Arquivo nao encontrado")

        # filename;path;object;exposure;date-obs;ra;dec;telescop;instrume;observer;filter;file_size
        # 'filename', 'path', 'object', 'exposure', 'date_obs', 'ra', 'dec', 'telescope', 'instrument', 'observer', 'filter', 'file_size',
        data = pd.read_csv(
            file_path,
            delimiter=';',
            # names=['filename', 'path', 'object', 'date', 'exposure', 'date_obs', 'ra',
            #        'dec', 'telescope', 'instrument', 'observer', 'filter', 'file_size', ],
            names=['filename', 'path', 'object', 'exposure', 'date_obs', 'ra', 'dec', 'telescop', 'instrume', 'observer', 'filter', 'file_size'],
            # parse_dates=['date', 'date_obs'],
            parse_dates=['date_obs'],
            dtype={
                "file_size": int
            },
            skiprows=1,
            nrows=options['limit'])


        ignore_targets = list(['flat field', 'flat', 'bias', 'teste'])


        for row in data.itertuples():

            target = str(row.object)
            if target.lower() in ignore_targets:
                self.stdout.write("Ignored: [ %s ] Filename [ %s ]" % (row.object, row.filename))
            else:
                self.create_record(row)
