import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      return;
    }
    const data = prompt('Введите пароль');
    if (data === 'admin93') {
      sessionStorage.setItem('token', 'true');
      return alert('welcome');
    }
    return this.router.navigate(['']);
  }
}
