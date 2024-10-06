import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
  @Input() billId!: number; // Accept billId as input property
  cashRequestForm: FormGroup;
  timeSlots: string[] = [
    'SLOT_1 (10:00 AM - 12:00 PM)',
    'SLOT_2 (12:00 PM - 1:00 PM)',
    'SLOT_3 (2:00 PM - 4:00 PM)',
    'SLOT_4 (4:00 PM - 6:00 PM)'
  ];

  timeSlotMapping: { [key: string]: string } = {
    'SLOT_1': '10:00 AM - 12:00 PM',
    'SLOT_2': '12:00 PM - 1:00 PM',
    'SLOT_3': '2:00 PM - 4:00 PM',
    'SLOT_4': '4:00 PM - 6:00 PM'
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  // New properties for status handling
  isRequestPending: boolean = false;
  isRequestApproved: boolean = false;
  appointmentDate: string | null = null;
  timeSlot: string | null = null;
  employeeName: string | null = null;
  expandedTimeSlot: string | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.cashRequestForm = this.fb.group({
      timeSlot: ['', Validators.required],
      appointmentDate: ['', Validators.required], // Added appointment date field
    });
  }

  ngOnInit() {
    this.getCashPaymentRequestStatus();
  }

  getCashPaymentRequestStatus() {
    this.http.get(`http://localhost:8080/api/payment/cash-payment-request-status/${this.billId}`)
      .subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            const { status, appointmentDate, timeSlot, employeeName } = response.data;

            this.isRequestPending = status === 'PENDING';
            this.isRequestApproved = status === 'APPROVED';
            this.appointmentDate = appointmentDate;
            this.timeSlot = timeSlot;
            this.expandedTimeSlot = this.timeSlotMapping[timeSlot] || timeSlot;
            this.employeeName = employeeName;

            if (this.isRequestPending) {
              this.successMessage = 'Your cash payment request is pending.';
            } else if (this.isRequestApproved) {
              this.successMessage = `Cash payment request approved. Appointment Date: ${appointmentDate}, Time Slot: ${this.expandedTimeSlot}, Employee: ${employeeName}`;
            }
          } else {
            this.errorMessage = 'No cash request found. Please book a slot.';
          }
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
        }
      );
  }

  requestCashPayment() {
    if (this.cashRequestForm.valid) {
      const { timeSlot, appointmentDate } = this.cashRequestForm.value;

      const requestBody = {
        billId: this.billId,
        appointmentDate: appointmentDate,
        timeSlot: timeSlot
      };

      this.http.post(`http://localhost:8080/api/payment/request-cash-payment`, requestBody)
        .subscribe(
          (response: any) => {
            this.successMessage = response.message;
            this.errorMessage = null;
            this.cashRequestForm.reset(); // Reset form after successful request
          },
          (error) => {
            this.errorMessage = error.error.message || 'An error occurred';
            this.successMessage = null;
          }
        );
    }
  }
}
