import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      this.authService.login(user, password).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = 'Error al iniciar sesión';
        }
      );
    }
  }
}