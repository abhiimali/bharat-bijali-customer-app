import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoiceData: any;
  billId!: number;
  errorMessage: string | null = null;
  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get billId from the route
    this.route.params.subscribe(params => {
      this.billId = params['billId'];
      this.getInvoice(this.billId);
    });
  }

  getInvoice(billId: number): void {
    this.invoiceService.getInvoice(billId).subscribe(response => {
      if (response.statusCode === 200) {
        this.invoiceData = response.data;
        console.log(this.invoiceData)
        this.errorMessage = null; // Clear error if data is found
      } else {
        this.invoiceData = null; // Clear invoice data
        this.errorMessage = response.message; // Set error message
      }
    }, error => {
      // Optional: Handle network or other server-side errors here
      this.errorMessage = 'Something went wrong. Please try again later.';
    });
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }


  generatePDF(): void {
    const invoiceElement = document.getElementById('invoice')!;

    html2canvas(invoiceElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  }
}
