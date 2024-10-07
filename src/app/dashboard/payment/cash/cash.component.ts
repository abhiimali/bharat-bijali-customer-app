import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { stat } from 'fs';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
  @Input() billId!: number;
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

  isRequestPending: boolean = false;
  isRequestApproved: boolean = false;
  isRequestCancelled: boolean = false;

  isRequestFulfilled : boolean = false;
  canCancel: boolean = false;
  canReschedule: boolean = false;
  appointmentDate: string | null = null;
  timeSlot: string | null = null;
  expandedTimeSlot: string | null = null;
  requestId: number | null = null;

  showRescheduleForm: boolean = false; // Add reschedule form toggle

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {
    this.cashRequestForm = this.fb.group({
      timeSlot: ['', Validators.required],
      appointmentDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCashPaymentRequestStatus();
  }

  getCashPaymentRequestStatus() {
    this.paymentService.getCashPaymentRequestStatus(this.billId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          const { status, appointmentDate, timeSlot, employeeName, actionCount, requestId } = response.data;

          this.isRequestPending = status === 'PENDING';
          this.isRequestApproved = status === 'APPROVED';
          this.isRequestCancelled = status === 'CANCELLED';
          this.isRequestFulfilled = status === 'FULFILLED';

          this.appointmentDate = appointmentDate;
          this.timeSlot = timeSlot;
          this.expandedTimeSlot = this.timeSlotMapping[timeSlot.split(' ')[0]] || timeSlot;
          this.requestId = requestId;

          if (this.isRequestPending) {
            this.successMessage = 'Your cash payment request is pending.';
            this.canCancel = true;
            this.canReschedule = true;
          } else if (this.isRequestApproved) {
            this.successMessage = `Cash payment request approved. Appointment Date: ${appointmentDate}, Time Slot: ${this.expandedTimeSlot}, Employee: ${employeeName}`;
            this.canCancel = true;
            this.canReschedule = true;
          } else if (this.isRequestCancelled) {
            this.successMessage = 'Your cash payment request has been cancelled.';
            this.canReschedule = true; // Allow reschedule even if canceled
            this.canCancel = false;
          }
          else if(this.isRequestFulfilled) {
            this.successMessage = 'Your Cash Payment Done. This Bill Is Paid Via Cash.';

this.canReschedule = false; // Allow reschedule even if canceled
            this.canCancel = false;

          }

          // Handle action limit (if backend allows only limited reschedules/cancels)
          if (actionCount >= 2) {
            this.canCancel = false;
            this.canReschedule = false; // Disallow reschedule if action limit exceeded
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
    if (this.cashRequestForm.valid && !this.requestId) { // Only allow creating a request if none exists
      const { timeSlot, appointmentDate } = this.cashRequestForm.value;
      const requestBody = {
        billId: this.billId,
        appointmentDate: appointmentDate,
        timeSlot: timeSlot.split(' ')[0] // Extract only the slot identifier
      };

      this.paymentService.requestCashPayment(requestBody).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = null;
          this.cashRequestForm.reset();
          this.getCashPaymentRequestStatus(); // Refresh status
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = null;
        }
      );
    }
  }

  cancelCashPayment() {
    if (this.requestId) {
      this.paymentService.cancelCashPayment(this.requestId).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = null;
          this.getCashPaymentRequestStatus(); // Refresh after cancel
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = null;
        }
      );
    }
  }

  toggleRescheduleForm() {
    this.showRescheduleForm = !this.showRescheduleForm; // Toggle form visibility
  }

  rescheduleCashPayment() {
    if (this.cashRequestForm.valid && this.requestId) {
      const { timeSlot, appointmentDate } = this.cashRequestForm.value;
      const requestBody = {
        requestId: this.requestId,
        appointmentDate: appointmentDate,
        timeSlot: timeSlot.split(' ')[0] // Extract only the slot identifier
      };

      this.paymentService.rescheduleCashPayment(requestBody).subscribe(
        (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = null;
          this.getCashPaymentRequestStatus(); // Refresh status
          this.showRescheduleForm = false; // Hide form after successful reschedule
        },
        (error) => {
          this.errorMessage = error.error.message || 'An error occurred';
          this.successMessage = null;
        }
      );
    }
  }
}
