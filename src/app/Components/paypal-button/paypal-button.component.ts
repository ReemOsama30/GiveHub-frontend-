import { Component, Input, OnInit, input } from '@angular/core';
interface PayPalCreateOrderActions {
  order: {
    create: (data: any) => Promise<string>;
  };
}

interface PayPalOnApproveActions {
  order: {
    capture: () => Promise<PayPalOrderDetails>;
  };
}

interface PayPalOrderDetails {
  payer: {
    name: {
      given_name: string;
    };
  };
}

interface PayPalError {
  message: string;
}
@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnInit{

  constructor() { }

  
  ngOnInit(): void {
    this.addPaypalScript().then(() => {
      this.initPayPalButton();
    });
  }

  addPaypalScript(): Promise<void> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=ARuNS6rodPHLZvbF3L4UE__s2jsTVJUa3v-ZOcuYlstVsuLH-S9pqFEag9iidEY-LUZXRA1WW-iNRecX&currency=USD&disable-funding=credit,card';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }
  

  initPayPalButton(): void {
    (window as any).paypal.Buttons({
      fundingSource: (window as any).paypal.FUNDING.PAYPAL,
      createOrder: (data: any, actions: PayPalCreateOrderActions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value:localStorage.getItem('Amount')?.toString(),
            }
          }]
        });
      },
      onApprove: (data: any, actions: PayPalOnApproveActions) => {
        return actions.order.capture().then((details: PayPalOrderDetails) => {
          //alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onError: (err: PayPalError) => {
        console.error(err);
      }
    }).render('#paypal-button-container');
  }
}
