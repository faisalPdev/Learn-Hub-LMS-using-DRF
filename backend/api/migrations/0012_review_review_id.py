# Generated by Django 4.2.7 on 2024-06-26 08:55

from django.db import migrations
import shortuuid.django_fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_rename_variant_time_completedlesson_variant_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='review_id',
            field=shortuuid.django_fields.ShortUUIDField(alphabet='123456789', length=6, max_length=20, prefix='', unique=True),
        ),
    ]
