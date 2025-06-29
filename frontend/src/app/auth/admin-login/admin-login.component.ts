import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl = '/admin';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Get return URL from route parameters or default to '/admin'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.adminLogin(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Admin login successful!', 'Close', { duration: 3000 });
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Admin login error:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  navigateToCustomerLogin() {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}
