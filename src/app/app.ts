import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomePage } from './Components/home-page/home-page';
import { Topbar } from './Components/topbar/topbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
