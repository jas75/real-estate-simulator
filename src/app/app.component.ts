import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { YieldFormComponent } from "./components/yield-form/yield-form.component";
import { CardResultComponent } from "./components/card-result/card-result.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, YieldFormComponent, CardResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'real-estate-simulator';
}
