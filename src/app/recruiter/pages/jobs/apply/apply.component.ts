import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import Swal from 'sweetalert2';
// store
import { Store } from '@ngrx/store';
import { fetchJobApplyData } from 'src/app/recruiter/store/Job/job.action';
import { selecDatapply } from 'src/app/recruiter/store/Job/job-selector';
import { CandidacyResponseUserDto } from 'src/app/recruiter/services/models/candidacy-response-user-dto';
import { CandidacyService } from 'src/app/recruiter/services/service/candidacy.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})

/**
 * Apply Component
 */
export class ApplyComponent implements OnInit {
  endItem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  jobApplyForm!: UntypedFormGroup;
  submitted: boolean = false;
  page: number = 1
  // Table data
  content?: any;
  applies?: any;
  applyjob: any
  total: Observable<number>;
  id:number;
  jobs:CandidacyResponseUserDto[]

  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder, public store: Store,private CandidacyService:CandidacyService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Job Apply', active: true }];

    /**
* fetches data
*/
    /*this.store.dispatch(fetchJobApplyData());
    this.store.select(selecDatapply).subscribe(data => {
      this.applies = data;
      this.applyjob = data;
      this.applies = this.applyjob.slice(0, 8)
    });*/
    this.id=Number(this.activatedRoute.snapshot.paramMap.get("id"));



   this.CandidacyService.getCandidacyByCandidate(this.id).subscribe({
      next:data=>{
      this.jobs=data;
      }
   
      ,error:error=>{
        console.log("there is an error:",error);
      }
    
    })
    

  }

  // Delete Data
  

  // pagination
  pagechanged(event: any) {
    const startItem = (event.page - 1) * event.itemsPerPage
    this.endItem = event.page * event.itemsPerPage
    this.applies = this.applyjob(startItem, this.endItem)
  }
}
