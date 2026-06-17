from rest_framework import serializers

from .models import DonorTable, RecipientTable, SignIn
from .utils import generate_donorid, generate_recipientid, generate_userid


class SignInSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='mailid', read_only=True)

    class Meta:
        model = SignIn
        fields = ['id', 'userid', 'mailid', 'email', 'time']
        read_only_fields = ['id', 'userid', 'time']


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30, required=False, allow_blank=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=4)
    confirm_password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        if SignIn.objects.filter(mailid=value).exists():
            raise serializers.ValidationError('This email is already registered.')
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        validated_data.pop('name', None)
        signin = SignIn.objects.create(
            mailid=validated_data['email'],
            password=validated_data['password'],
        )
        signin.userid = generate_userid(signin.id)
        signin.save(update_fields=['userid'])
        return signin


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            signin = SignIn.objects.get(mailid=attrs['email'])
        except SignIn.DoesNotExist as exc:
            raise serializers.ValidationError('Invalid email or password.') from exc

        if signin.password != attrs['password']:
            raise serializers.ValidationError('Invalid email or password.')

        attrs['signin'] = signin
        return attrs


class DonorSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source='phonenumber', read_only=True)
    lastDonated = serializers.DateField(source='recent_date', read_only=True)

    class Meta:
        model = DonorTable
        fields = [
            'id',
            'donorid',
            'userid',
            'name',
            'dob',
            'city',
            'gender',
            'recent_date',
            'lastDonated',
            'phonenumber',
            'phone',
            'maritalstatus',
        ]


class DonorCreateSerializer(serializers.ModelSerializer):
    dob = serializers.DateField(required=False, allow_null=True)
    mobile = serializers.CharField(source='phonenumber')
    lastDonatedDate = serializers.DateField(
        source='recent_date',
        required=False,
        allow_null=True,
    )
    maritalStatus = serializers.CharField(source='maritalstatus', required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = DonorTable
        fields = [
            'name',
            'dob',
            'mobile',
            'address',
            'city',
            'gender',
            'lastDonatedDate',
            'maritalStatus',
            'userid',
        ]
        extra_kwargs = {
            'city': {'required': False, 'allow_blank': True},
            'userid': {'required': False},
        }

    def validate_phonenumber(self, value):
        if DonorTable.objects.filter(phonenumber=value).exists():
            raise serializers.ValidationError('This phone number is already registered.')
        return value

    def create(self, validated_data):
        address = validated_data.pop('address', '')
        if not validated_data.get('city') and address:
            validated_data['city'] = address[:50]

        if not validated_data.get('city'):
            raise serializers.ValidationError({'city': 'City is required.'})

        userid = validated_data.get('userid')
        if not userid:
            signin = self.context.get('signin')
            if signin:
                userid = signin.userid
            else:
                raise serializers.ValidationError({'userid': 'User ID is required. Please sign in first.'})

        validated_data['userid'] = userid
        donor = DonorTable.objects.create(**validated_data)
        donor.donorid = generate_donorid(donor.id)
        donor.save(update_fields=['donorid'])
        return donor


class RecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipientTable
        fields = [
            'id',
            'recipientid',
            'userid',
            'patientname',
            'contactnumber',
            'age',
            'gender',
            'unitsreq',
            'reason',
            'location',
            'hospitalname',
            'frequency',
        ]


class RecipientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipientTable
        fields = [
            'patientname',
            'contactnumber',
            'age',
            'gender',
            'unitsreq',
            'reason',
            'location',
            'hospitalname',
            'frequency',
            'userid',
        ]
        extra_kwargs = {
            'userid': {'required': False},
        }

    def validate_contactnumber(self, value):
        if RecipientTable.objects.filter(contactnumber=value).exists():
            raise serializers.ValidationError('This contact number is already registered.')
        return value

    def create(self, validated_data):
        userid = validated_data.get('userid')
        if not userid:
            signin = self.context.get('signin')
            if signin:
                userid = signin.userid
            else:
                raise serializers.ValidationError({'userid': 'User ID is required. Please sign in first.'})

        validated_data['userid'] = userid
        recipient = RecipientTable.objects.create(**validated_data)
        recipient.recipientid = generate_recipientid(recipient.id)
        recipient.save(update_fields=['recipientid'])
        return recipient
