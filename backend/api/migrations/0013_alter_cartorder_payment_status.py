# Generated by Django 4.2.7 on 2024-06-30 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_review_review_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartorder',
            name='payment_status',
            field=models.CharField(choices=[('Paid', 'Paid'), ('Processing', 'Processing'), ('Failed', 'Failed')], default='Processing', max_length=100),
        ),
    ]