import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon, 
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMenuVisible = false;

  constructor(private router: Router){}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
