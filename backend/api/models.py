from django.db import models


class SignIn(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.CharField(max_length=30, unique=True, null=True, blank=True)
    mailid = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'signin'
        managed = False

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def __str__(self):
        return self.mailid


class DonorTable(models.Model):
    id = models.AutoField(primary_key=True)
    donorid = models.CharField(max_length=30, unique=True, null=True, blank=True)
    userid = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    dob = models.DateField(db_column='DOB', null=True, blank=True)
    city = models.CharField(max_length=50)
    gender = models.CharField(max_length=20)
    recent_date = models.DateField(db_column='Recent_date', null=True, blank=True)
    phonenumber = models.CharField(max_length=12, unique=True)
    maritalstatus = models.CharField(max_length=40)

    class Meta:
        db_table = 'donortable'
        managed = False
        ordering = ['-id']

    def __str__(self):
        return f'{self.name} ({self.donorid})'


class RecipientTable(models.Model):
    id = models.AutoField(primary_key=True)
    recipientid = models.CharField(max_length=30, unique=True, null=True, blank=True)
    userid = models.CharField(max_length=30)
    patientname = models.CharField(max_length=20)
    contactnumber = models.CharField(max_length=12, unique=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=15)
    unitsreq = models.CharField(max_length=20)
    reason = models.CharField(max_length=50)
    location = models.CharField(max_length=20)
    hospitalname = models.CharField(max_length=30)
    frequency = models.CharField(max_length=25)

    class Meta:
        db_table = 'recipienttable'
        managed = False
        ordering = ['-id']

    def __str__(self):
        return f'{self.patientname} ({self.recipientid})'
