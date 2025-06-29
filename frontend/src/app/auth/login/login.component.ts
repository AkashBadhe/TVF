import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl = '/';

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

    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register'], { queryParams: { returnUrl: this.returnUrl } });
  }

  navigateToAdminLogin() {
    this.router.navigate(['/auth/admin-login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}
