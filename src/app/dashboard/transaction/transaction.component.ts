import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService, Transaction } from './transaction.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  displayedColumns: string[] = ['transactionId', 'amount', 'status', 'timestamp', 'paymentType'];
  dataSource = new MatTableDataSource<Transaction>();

  selectedDate: Date | null = null; 
  selectedStatus: string = ''; 

  totalElements = 0;
  page = 0;
  size = 10;

  allTransactions: Transaction[] = []; // Store all transactions

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions(this.page, this.size).subscribe((response) => {
      this.allTransactions = response.data;
      this.dataSource.data = this.allTransactions; // Set initial data
      this.totalElements = response.totalElements;
      this.dataSource.paginator = this.paginator;
    });
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadTransactions(); // Reload transactions based on pagination
  }

  applyFilters(): void {
    this.page = 0; // Reset to first page when applying filters
    this.filterTransactions();
  }

  filterTransactions(): void {
    let filteredData = this.allTransactions;

    // Filter by status
    if (this.selectedStatus) {
      filteredData = filteredData.filter(transaction => transaction.status === this.selectedStatus);
    }

    // Filter by date
    if (this.selectedDate) {
      const selectedDateString = this.selectedDate.toDateString();
      filteredData = filteredData.filter(transaction => {
        const transactionDate = new Date(transaction.timestamp).toDateString();
        return transactionDate === selectedDateString;
      });
    }

    this.dataSource.data = filteredData;
    this.totalElements = filteredData.length; // Update total elements
    this.paginator.pageIndex = 0; // Reset paginator to first page
  }

  clearFilters(): void {
    this.selectedDate = null;
    this.selectedStatus = '';
    this.loadTransactions(); // Reload transactions without filters
  }
}
