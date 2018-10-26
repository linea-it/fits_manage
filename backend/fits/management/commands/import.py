from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import csv
from fits.models import Exposure, Header

class Command(BaseCommand):

    def add_arguments(self, parser):

        # Nome do arquivo csv que sera importado
        parser.add_argument('filename', type=str, help='Name the csv file with the list of Headers to be inserted. the file must be in the archive directory.')

        # Apaga todas os registros antes de incluir novos
        parser.add_argument(
            '--delete',
            action='store_true',
            dest='delete',
            help='Delete all before creating new ones',
        )

    def delete(self):
        
        self.stdout.write("Removing %s records" % Exposure.objects.count())    
        
        # Para cada registro no Model Exposure, executar o comando delete
        for x in Exposure.objects.all().iterator():
            x.delete()

    def create_record(self, row):
        self.stdout.write("Creating record for the file: %s" % row['filename'])


        try:
            exposure = Exposure()
            exposure.filename=row['filename']
            exposure.file_path=row['path']
            exposure.file_size=row['file_size']
            exposure.save()

            header = Header()
            header.archive = exposure
            # TODO: Formata a string data para um objeto datetime do python
            header.date = row['date']
            header.dateobs = row['date-obs']          
            header.ra = row['ra']
            header.dec = row['dec']

            header.save()
            # TODO: Criar Campos para coordenda RA e Dec em graus.

        except Exception as e:
            raise(e)


    def handle(self, *args, **options):

        if options['delete']:
            if settings.DEBUG:
                self.stdout.write("Deleting All entries before insert new ones")
                self.delete()
            else:
                self.stdout.write("Production environment delete option ignored.")

        filename = options['filename']

        file_path = os.path.join(settings.ARCHIVE_DIR, os.path.basename(filename))

        self.stdout.write(file_path)

        if not os.path.exists(file_path):
            self.stdout.write("Arquivo nao encontrado")

        fieldnames = ['filename','path','simple','bitpix','naxis','naxis1','naxis2','extend','origin','date','iraf-tlm','object','comment','acqmode','readmode','imgrect','hbin','vbin','subrect','xtype','trigger','calib','dllver','exposure','temp','readtime','operatn','gain','emrealgn','vshift','preamp','serno','unsttemp','dtnwlgth','sntvty','frame','eshtmode','detector','exptime','outptamp','camgain','date-obs','ra','dec','epoch','airmass','jd','st','ha','image','telescop','platescl','instrume','observer','rdnoise','filter','focusval','w-bar','w-temp','w-hum','file_size']

        with open(file_path) as csvfile:
            reader = csv.DictReader(csvfile, fieldnames=fieldnames, delimiter=';')
            for row in reader:
                self.create_record(row)


