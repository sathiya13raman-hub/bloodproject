from django.contrib import admin

from .models import DonorTable, RecipientTable, SignIn


@admin.register(SignIn)
class SignInAdmin(admin.ModelAdmin):
    list_display = ['userid', 'mailid', 'time']
    search_fields = ['userid', 'mailid']
    readonly_fields = ['id', 'time']


@admin.register(DonorTable)
class DonorTableAdmin(admin.ModelAdmin):
    list_display = [
        'donorid',
        'name',
        'city',
        'gender',
        'phonenumber',
        'recent_date',
        'userid',
    ]
    list_filter = ['city', 'gender', 'maritalstatus']
    search_fields = ['name', 'phonenumber', 'donorid', 'userid']


@admin.register(RecipientTable)
class RecipientTableAdmin(admin.ModelAdmin):
    list_display = [
        'recipientid',
        'patientname',
        'location',
        'hospitalname',
        'unitsreq',
        'userid',
    ]
    list_filter = ['location', 'gender']
    search_fields = ['patientname', 'contactnumber', 'recipientid', 'userid']
