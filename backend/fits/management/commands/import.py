from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import csv
from fits.models import Exposure, Header

import pandas as pd


class Command(BaseCommand):

    def add_arguments(self, parser):

        # Nome do arquivo csv que sera importado
        parser.add_argument(
            'filename', type=str, help='Name the csv file with the list of Headers to be inserted. the file must be in the archive directory.')

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
        # Para cada registro no Model Exposure, executar o comando delete
        for x in Exposure.objects.all().iterator():
            x.delete()

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
        self.stdout.write("Creating record for the file: %s" % row.filename)

        # self.stdout.write("Row File_size: %s" % row.file_size)

        try:
            exposure = Exposure()
            exposure.filename = row.filename
            exposure.file_path = row.path
            exposure.file_size = row.file_size
            exposure.ra_deg = self.convert_ra_sex_to_deg(row.ra)
            exposure.dec_deg = self.convert_dec_sex_to_deg(row.dec)
            exposure.save()

            header = Header()
            header.archive = exposure
            # TODO: Formata a string data para um objeto datetime do python
            header.date = row.date
            header.dateobs = row.date_obs
            header.ra = row.ra
            header.dec = row.dec

            header.save()
            # TODO: Criar Campos para coordenda RA e Dec em graus.

        except Exception as e:
            raise(e)

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

        self.stdout.write(file_path)

        if not os.path.exists(file_path):
            self.stdout.write("Arquivo nao encontrado")

        # # fieldnames = ['filename','path','simple','bitpix','naxis','naxis1','naxis2','extend','origin','date','iraf-tlm','object','comment','acqmode','readmode','imgrect','hbin','vbin','subrect','xtype','trigger','calib','dllver','exposure','temp','readtime','operatn','gain','emrealgn','vshift','preamp','serno','unsttemp','dtnwlgth','sntvty','frame','eshtmode','detector','exptime','outptamp','camgain','date-obs','ra','dec','epoch','airmass','jd','st','ha','image','telescop','platescl','instrume','observer','rdnoise','filter','focusval','w-bar','w-temp','w-hum','file_size']
        # fieldnames = ['filename', 'path', 'date', 'object', 'exposure', 'date-obs', 'ra', 'dec', 'telescop', 'instrume', 'observer', 'filter', 'file_size', ]

        # with open(file_path) as csvfile:
        #     reader = csv.DictReader(csvfile, fieldnames=fieldnames, delimiter=';')
        #     for row in reader:
        #         self.create_record(row)

        data = pd.read_csv(
            file_path,
            delimiter=';',
            names=['filename', 'path', 'date', 'object', 'exposure', 'date_obs', 'ra',
                   'dec', 'telescop', 'instrume', 'observer', 'filter', 'file_size', ],
            dtype={"file_size": int},
            skiprows=1)

        for row in data.itertuples():
            self.create_record(row)
