import { Component, inject } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private router = inject(Router);
  
  navigateToProducts() {
    this.router.navigate(['/productos']);
  }

  navigateToTransactions() {
    this.router.navigate(['/transacciones']);
  }

}
