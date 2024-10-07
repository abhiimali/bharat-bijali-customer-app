import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NotificationService } from 'src/app/common/notification/notification.service';

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
    private location: Location, private notificationService : NotificationService
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
        this.errorMessage = null;
      } else {
        this.invoiceData = null; 
        this.notificationService.showError(response.message)
        this.errorMessage = response.message;
      }
    }, error => {
      this.errorMessage = 'Something went wrong. Please try again later.';
    });
  }

  goBack(): void {
    this.location.back(); 
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
