import { Component, OnInit } from '@angular/core';
import { PaymentReceiptService } from './payment-receipt.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {
  paymentReceiptData: any;
  billId!: number;
  errorMessage: string | null = null;

  constructor(
    private paymentReceiptService: PaymentReceiptService, 
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get billId from the route
    this.route.params.subscribe(params => {
      this.billId = params['billId'];
      this.getPaymentReceipt(this.billId);
    });
  }

  getPaymentReceipt(billId: number): void {
    this.paymentReceiptService.getPaymentReceipt(billId).subscribe(
      response => {
        if (response.statusCode === 200) {
          this.paymentReceiptData = response.data;
          this.errorMessage = null; // Clear error if data is found
        } else {
          this.paymentReceiptData = null; // Clear payment data
          this.errorMessage = response.message; // Set error message
        }
      },
      error => {
        this.errorMessage = 'Something went wrong. Please try again later.';
      }
    );
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }

  sendEmail(): void {
    // Implement email sending logic here
    console.log('Send email functionality to be implemented');
  }

  generatePDF(): void {
    const receiptElement = document.getElementById('payment-receipt')!;

    html2canvas(receiptElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('payment-receipt.pdf');
    });
  }
}
