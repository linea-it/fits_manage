from django.db import models

class Exposure(models.Model):

    filename = models.CharField(
        max_length=256,
        verbose_name='Filename', 
        help_text='Filename',
        null=True, 
        blank=True
    )

    ra_deg = models.FloatField(
        verbose_name='RA (deg)',
        null=True, 
        blank=True
    )

    dec_deg = models.FloatField(
        verbose_name='Dec (deg)',
        null=True, 
        blank=True
    )

    file_path = models.CharField(
        max_length=256,
        verbose_name='File Path',
        help_text='Path',
        null=True, 
        blank=True
    )

    file_size = models.PositiveIntegerField(
        verbose_name='File Size',
        null=True, 
        blank=True, 
        default=None, 
        help_text='File Size in bytes'
    )

    def __str__(self):
        return (self.filename)


class Header(models.Model):

    archive = models.ForeignKey(
        Exposure, 
        related_name='headers',
        on_delete=models.CASCADE
    )

    date = models.CharField(
        max_length=256,
        verbose_name='Date',
        help_text='Date',
        null=True,
        blank=True,
        )

    dateobs = models.DateTimeField(
        max_length=256,
        verbose_name='Date-Obs',
        help_text='Start of Frame Exposure',
        null=True,
        blank=True
        )

    ra = models.CharField(
        max_length=20,
        verbose_name='Ra',
        help_text='Alpha',
        null=True,
        blank=True
        )

    dec = models.CharField(
        max_length=20,
        verbose_name='Dec',
        help_text='Delta',
        null=True,
        blank=True
        )

    simple = models.BooleanField(
        verbose_name='Simple', 
        help_text='',
        default=False
    )

    bitpix = models.PositiveIntegerField(
        verbose_name='BitPix',
        help_text='BitPix',
        default=False,
        null=True,
        blank=True
        )

    naxis = models.PositiveIntegerField(
        verbose_name='Naxis',
        help_text='Naxis',
        default=False,
        null=True,
        blank=True
        )

    naxis1 = models.PositiveIntegerField(
        verbose_name='Naxis1',
        help_text='BitPix',
        default=False,
        null=True,
        blank=True
        )

    naxis2 = models.PositiveIntegerField(
        verbose_name='Naxis2',
        help_text='Naxis2',
        default=False,
        null=True,
        blank=True
        )

    extend = models.BooleanField(
        verbose_name='Extend',
        help_text='Extend',
        default=False,
        )
    
    comment = models.CharField(
        max_length=256,
        verbose_name='Comment',
        help_text='Comentario',
        null=True,
        blank=True
        )

    acqmode = models.CharField(
        max_length=256,
        verbose_name='AcqMode',
        help_text='Acquisition Mode',
        null=True,
        blank=True
        )

    readmode = models.CharField(
        max_length=256,
        verbose_name='ReadMode',
        help_text='Readout Mode',
        null=True,
        blank=True
        )

    imgrect = models.CharField(
        max_length=256,
        verbose_name='ImgRect',
        help_text='Image Format',
        null=True,
        blank=True
        )

    hbin = models.CharField(
        max_length=256,
        verbose_name='Hbin',
        help_text='Horizontal Binning',
        null=True,
        blank=True
        )

    vbin = models.CharField(
        max_length=256,
        verbose_name='Vbin',
        help_text='Vertical Binning',
        null=True,
        blank=True
        )

    subrect = models.CharField(
        max_length=256,
        verbose_name='SubRect',
        help_text='Sub Image Format',
        null=True,
        blank=True
        )
    
    xtype = models.CharField(
        max_length=256,
        verbose_name='XType',
        help_text='Calibration Type',
        null=True,
        blank=True
        )

    trigger = models.CharField(
        max_length=256,
        verbose_name='Trigger',
        help_text='Trigger Mode',
        null=True,
        blank=True
        )

    calib = models.CharField(
        max_length=256,
        verbose_name='Calib',
        help_text='Calibration',
        null=True,
        blank=True
        )


    dllver = models.CharField(
        max_length=256,
        verbose_name='DllVer',
        help_text='Software Version',
        null=True,
        blank=True
        )

    exposure = models.CharField(
        max_length=256,
        verbose_name='Exposure',
        help_text='Total Exposure Time',
        null=True,
        blank=True
        )

    temp = models.CharField(
        max_length=256,
        verbose_name='Temp',
        help_text='Temperature',
        null=True,
        blank=True
        )

    readtime = models.FloatField(
        verbose_name='ReadTime',
        help_text='Pixel readout time',
        null=True,
        blank=True,
        )

    operatn = models.PositiveIntegerField(
        verbose_name='OperaTn',
        help_text='Type of System',
        null=True,
        blank=True
        )
    gain = models.CharField(
        max_length=256,
        verbose_name='Gain',
        help_text='Gain',
        null=True,
        blank=True
        )

    emrealgn = models.PositiveIntegerField(
        verbose_name='EmRealGn',
        help_text='In real Gain',
        null=True,
        blank= False
        )

    vshift = models.CharField(
        max_length=256,
        verbose_name='VShift',
        help_text='Vertical Shift Speed',
        null=True,
        blank=True
        )

    preamp = models.CharField(
        max_length=256,
        verbose_name='PreAmp',
        help_text='Pre Amplifier Gain',
        null=True,
        blank=True
        )

    serno = models.CharField(
        max_length=256,
        verbose_name='Serno',
        help_text='Serial Number',
        null=True,
        blank=True
        )

    unsttemp = models.CharField(
        max_length=256,
        verbose_name='UnstTemp',
        help_text='Unstabilized Temperature',
        null=True,
        blank=True
        )

    dtnwlgth = models.FloatField(
        verbose_name='Dtnwlgth',
        help_text='Detection Wavelength',
        null=True,
        blank=True,
        )
        
    sntvty = models.FloatField(
        verbose_name='Sntvty',
        help_text='Sensitivity',
        null=True,
        blank=True,
        )

    frame = models.CharField(
        max_length=256,
        verbose_name='Frame',
        help_text='Start of Frame Exposure',
        null=True,
        blank=True
        )

    eshtmode = models.PositiveIntegerField(
        verbose_name='EshtMode',
        null=True, 
        blank=True, 
        default=None, 
        help_text='Electronic Shuttering Mode'
        )

    detector = models.CharField(
        max_length=256,
        verbose_name='Detector',
        help_text='Head Model',
        null=True,
        blank=True
        )

    exptime = models.CharField(
        max_length=256,
        verbose_name='Exptime',
        help_text='Total Exposure Time',
        null=True,
        blank=True
        )

    outptamp = models.CharField(
        max_length=256,
        verbose_name='OutptAmp',
        help_text='Output Amplifier',
        null=True,
        blank=True
        )

    camgain = models.CharField(
        max_length=256,
        verbose_name='CamGain',
        help_text='Pre Amplifier Gain',
        null=True,
        blank=True
        )


    epoch = models.CharField(
        max_length=256,
        verbose_name='Epoch',
        help_text='Epoch',
        null=True,
        blank=True
        )
    airmass = models.CharField(
        max_length=256,
        verbose_name='AirMass',
        help_text='Air Mass',
        null=True,
        blank=True
        )

    jd = models.CharField(
        max_length=256,
        verbose_name='Jd',
        help_text='Juliana Date',
        null=True,
        blank=True
        )
    st = models.CharField(
        max_length=256,
        verbose_name='St',
        help_text='Sidereal Time',
        null=True,
        blank=True
        )

    ha = models.CharField(
        max_length=256,
        verbose_name='Ha',
        help_text='Time Angle',
        null=True,
        blank=True
        )

    image = models.CharField(
        max_length=256,
        verbose_name='Image',
        help_text='File name',
        null=True,
        blank=True
        )

    telescop = models.CharField(
        max_length=256,
        verbose_name='Telescop',
        help_text='Telescop',
        null=True,
        blank=True
        )

    platescl = models.CharField(
        max_length=256,
        verbose_name='Platescl',
        help_text='Plate Scale',
        null=True,
        blank=True
        )

    instrume = models.CharField(
        max_length=256,
        verbose_name='Instrument',
        help_text='Start of Frame Exposure',
        null=True,
        blank=True
        )

    observer = models.CharField(
        max_length=256,
        verbose_name='Observer',
        help_text='Observer',
        null=True,
        blank=True
        )
    rdnoise = models.CharField(
        max_length=256,
        verbose_name='RdNoise',
        help_text='Reading Noise',
        null=True,
        blank=True
        )
    band = models.CharField(
        max_length=256,
        verbose_name='Filter',
        help_text='Filter',
        null=True,
        blank=True
        )

    focusval = models.CharField(
        max_length=256,
        verbose_name='FocusVal',
        help_text='Foco Value',
        null=True,
        blank=True
        )

    wbar = models.FloatField(
        verbose_name='W-Bar',
        help_text='Atmospheric Pressure',
        null=True,
        blank=True
        )

    wtemp = models.FloatField(
        verbose_name='W-Temp',
        help_text='Ambiente Temperature',
        null=True,
        blank=True
        )

    whum = models.CharField(
        max_length=256,
        verbose_name='W-Hum',
        help_text='Moisture',
        null=True,
        blank=True
        )

