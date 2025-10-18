from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient


class AuthTests(TestCase):
	def setUp(self):
		self.client = APIClient()
		self.register_url = reverse('register')
		self.login_url = reverse('login')

	def test_register_and_login(self):
		data = {
			'username': 'testuser',
			'email': 'test@example.com',
			'password': 'strong-password-123',
			'role': 'user',
		}
		# Register
		resp = self.client.post(self.register_url, data, format='json')
		self.assertEqual(resp.status_code, 201)
		self.assertIn('access', resp.data)

		# Login
		resp2 = self.client.post(self.login_url, {'username': data['username'], 'password': data['password']}, format='json')
		self.assertEqual(resp2.status_code, 200)
		self.assertIn('access', resp2.data)
