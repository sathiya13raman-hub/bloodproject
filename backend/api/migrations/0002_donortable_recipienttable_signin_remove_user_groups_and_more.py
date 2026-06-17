from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    state_operations = [
        migrations.CreateModel(
            name='DonorTable',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('donorid', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('userid', models.CharField(max_length=30)),
                ('name', models.CharField(max_length=30)),
                ('dob', models.DateField(blank=True, db_column='DOB', null=True)),
                ('city', models.CharField(max_length=50)),
                ('gender', models.CharField(max_length=20)),
                ('recent_date', models.DateField(blank=True, db_column='Recent_date', null=True)),
                ('phonenumber', models.CharField(max_length=12, unique=True)),
                ('maritalstatus', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'donortable',
                'ordering': ['-id'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RecipientTable',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('recipientid', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('userid', models.CharField(max_length=30)),
                ('patientname', models.CharField(max_length=20)),
                ('contactnumber', models.CharField(max_length=12, unique=True)),
                ('age', models.IntegerField()),
                ('gender', models.CharField(max_length=15)),
                ('unitsreq', models.CharField(max_length=20)),
                ('reason', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=20)),
                ('hospitalname', models.CharField(max_length=30)),
                ('frequency', models.CharField(max_length=25)),
            ],
            options={
                'db_table': 'recipienttable',
                'ordering': ['-id'],
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='SignIn',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('userid', models.CharField(blank=True, max_length=30, null=True, unique=True)),
                ('mailid', models.EmailField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'signin',
                'managed': False,
            },
        ),
        migrations.RemoveField(
            model_name='user',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_permissions',
        ),
        migrations.DeleteModel(
            name='Donor',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=state_operations,
        ),
    ]
