import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Color } from './color';
@Component({
  selector: 'app-profile-blank',
  templateUrl: './profile-blank.component.html',
  styleUrls: ['./profile-blank.component.css']
})
export class ProfileBlankComponent implements OnInit {
  activeView : string = 'overview';
  colors: Color[];
  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)']
  }];
  
  total1: number = 500;
  data1: number = 250;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];
  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.activeView = this.router.snapshot.params['view']
  }

}

