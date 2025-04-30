import { Component, OnInit } from '@angular/core';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Store } from '@ngrx/store';
import { fetchprojectData } from 'src/app/recruiter/store/ProjectsData/project.actions';
import { selectData } from 'src/app/recruiter/store/ProjectsData/project-selector';
import { InterviewService } from 'src/app/recruiter/services/service/interview.service';
import { InterviewResponseDto } from 'src/app/recruiter/services/models/interview-response-dto';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss']
})

/**
 * Projects-list component
 */
export class ProjectlistComponent implements OnInit {
  totalItems = 12
  // bread crumb items
  breadCrumbItems: Array<{}>;
  total$: any
  page: any = 1;
  endItem: any = 12;
  returnedArray: InterviewResponseDto[];
  projectlist: InterviewResponseDto[];
  term:any;
  constructor(private interviewService:InterviewService,public store: Store) { }

  ngOnInit() {
    this.interviewService.getInterviewWithCandidate(2).subscribe({
      next:response=>{
        this.returnedArray=response;
        this.projectlist=response;
      },
      error: error=>{
        console.log(error);
      }


    })

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.returnedArray= this.projectlist.slice(startItem, this.endItem);
  }
  searchJob(value:string) {
    this.term=value;
    if (this.term) {
      this.returnedArray = this.projectlist.filter((data: any) => {
        return data.topic.toLowerCase().includes(this.term.toLowerCase())
      })
    } else {
      this.returnedArray = this.projectlist
    }

  }
  isMeetingActive(time:string): boolean {
    const currentTime = new Date();
    const startTime = new Date(time);
    const endTime = new Date(startTime.getTime()+30*60*1000);

    // Check if the current time is between start and end times
    return currentTime >= startTime && currentTime <= endTime;
  }
}
