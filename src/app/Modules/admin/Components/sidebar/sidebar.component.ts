import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Register the icon by adding a name and providing the safe URL
    this.matIconRegistry.addSvgIcon(
      'transactions',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/Images/Icons/transaction.svg')
    );
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

}
