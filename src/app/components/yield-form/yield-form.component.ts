import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-yield-form',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './yield-form.component.html',
  styleUrl: './yield-form.component.scss'
})
export class YieldFormComponent {

  public faCoffee = faCoffee;
}
