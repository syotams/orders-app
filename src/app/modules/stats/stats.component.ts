import { Component, OnInit } from '@angular/core';
import {StatsGateway} from '../../external/stats.gateway';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: any = [];

  constructor(private statsGateway: StatsGateway) { }

  ngOnInit() {
  	this.statsGateway.stats().subscribe(
  		result => {
  			this.stats = result;
  		},
  		err => {
  			// TODO: handle error
  		});
  }

}
