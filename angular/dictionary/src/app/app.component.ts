import { Component } from '@angular/core';
import { Routes } from '@angular/router';


interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  navLinks: NavLink[] = [
    { path: '/dict', label: 'Recently Added'},
    { path: '/learn', label: 'Go'},
    { path: '/settings', label: 'Settings'},
  ];
}
