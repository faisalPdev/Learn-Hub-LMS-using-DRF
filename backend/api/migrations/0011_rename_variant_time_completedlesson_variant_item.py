# Generated by Django 4.2.7 on 2024-06-25 07:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_notification_type_alter_variantitem_file'),
    ]

    operations = [
        migrations.RenameField(
            model_name='completedlesson',
            old_name='variant_time',
            new_name='variant_item',
        ),
    ]