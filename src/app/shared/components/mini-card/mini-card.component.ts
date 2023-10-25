import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CardData } from 'src/app/components/dashboard/dashboard.component';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent {
  @Input() cardData!: CardData;

  svg: any;

  constructor(private sanitizer: DomSanitizer) {
    // this.svg = sanitizer.bypassSecurityTrustHtml(this.cardData.svg);
  }

  ngOnInit(): void {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(this.cardData.svg);
  }
}
