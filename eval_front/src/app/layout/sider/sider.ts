import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sider',
  imports: [],
  templateUrl: './sider.html',
  styleUrl: './sider.css',
})
export class Sider {
  private router = inject(Router);
  @Input() actual:string = "";
  
  navigateTo(dir:string) {
    this.router.navigate([dir]);
  }

}
