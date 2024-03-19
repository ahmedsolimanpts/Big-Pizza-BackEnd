import { Injectable } from '@nestjs/common';
// import {
//   PayPalEnvironment,
//   PayPalHttpClient,
// } from '@paypal/checkout-server-sdk';

@Injectable()
export class PaypalService {
  base = 'https://api-m.sandbox.paypal.com';

  async generateAccessToken() {
    try {
      if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        throw new Error('MISSING_API_CREDENTIALS');
      }
      const auth = Buffer.from(
        process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_CLIENT_SECRET,
      ).toString('base64');
      const response = await fetch(`${this.base}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Failed to generate Access Token:', error);
    }
  }

  async handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }

  async createPayment(amount: any): Promise<any> {
    const accessToken = await this.generateAccessToken();
    const url = `${this.base}/v2/checkout/orders`;
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
    };
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return this.handleResponse(response);
  }

  async captureOrder(orderID) {
    const accessToken = await this.generateAccessToken();
    const url = `${this.base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return this.handleResponse(response);
  }
  //   async executePayment(paymentId: string, payerId: string): Promise<any> {
  //     // Execute payment logic
  //     // Use the PayPal API client
  //   }
}
