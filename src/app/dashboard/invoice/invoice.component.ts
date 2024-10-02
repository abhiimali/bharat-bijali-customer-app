import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get billId from the route
    this.route.params.subscribe(params => {
      this.billId = params['billId'];
      this.getInvoice(this.billId);
    });
  }

  getInvoice(billId: number): void {
    this.invoiceService.getInvoice(billId).subscribe(response => {
      this.invoiceData = response.data;
    });
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
