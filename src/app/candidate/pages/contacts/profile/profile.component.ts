import { Component, OnInit } from '@angular/core';
import { revenueBarChart, statData } from './data';
import { ChartType } from './profile.model';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from 'src/app/recruiter/shared/ui/pagetitle/pagetitle.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserService } from 'src/app/recruiter/services/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponseDto } from 'src/app/recruiter/services/models/user-response-dto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent,NgApexchartsModule]
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private http:HttpClient, private router:Router) { }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];

    // fetches the data
    this._fetchData();
    this.id=Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.userService.getUser(this.id).subscribe(data=>{
      this.user=data;
    })
  }




  selectedFile: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

uploadCV(id:number) {
  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.http.post(`http://localhost:8080/api/v1/users/upload/${id}`, formData).subscribe({
    next: res => console.log('Upload success', res),
    error: err => console.error('Upload error', err)
  });
}
downloadfile(id:number){
  {
    this.http.get(`http://localhost:8080/api/v1/users/${id}/download-cv`, {
      responseType: 'blob'
    }).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }
}
  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueBarChart: ChartType;
  statData:any;
  id:number;
  user:UserResponseDto;
  

  

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }

  gotocandidacy() {
   this.id= Number(this.activatedRoute.snapshot.paramMap.get("id"));

  this.router.navigateByUrl(`/jobs/apply/${this.id}`);
}
}