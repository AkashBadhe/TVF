import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  returnUrl = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(128),
        Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: ['']
    }, { validator: this.passwordMatchValidator });

    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const { confirmPassword, ...registerData } = this.registerForm.value;
    
    this.authService.register(registerData).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Registration successful! Welcome!', 'Close', { duration: 3000 });
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Registration error:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}
