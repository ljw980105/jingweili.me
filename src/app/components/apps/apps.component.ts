import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  constructor(private titleService: Title) {
      this.titleService.setTitle('Apps');
  }

  ngOnInit(): void {
  }

}
