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
  returnedArray: any;
  projectlist: InterviewResponseDto[];

  constructor(private interviewService:InterviewService,public store: Store) { }

  ngOnInit() {
    this.interviewService.getInterviewsWithRecruiter(102).subscribe({
      next:response=>{
        this.returnedArray=response;
      },
      error: error=>{
        console.log(error);
      }


    })

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.projectlist = this.returnedArray.slice(startItem, this.endItem);
  }
}
