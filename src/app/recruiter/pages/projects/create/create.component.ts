import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';
import { member } from './data';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { InterviewService } from 'src/app/recruiter/services/service/interview.service';
import { ActivatedRoute } from '@angular/router';
import { onInitEffects } from '@ngrx/effects/src/lifecycle_hooks';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  
})

/**
 * Projects-create component
 */
export class CreateComponent implements OnInit  {
  id:number;
  form:any;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  selected: any;
  hidden: boolean;
  files: File[] = [];
  assignMember: any

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;


  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.form=this.formbuilder.group({
      interviewDate:["",[Validators.required]],
      topic:["",[Validators.required]],
      time:["",[Validators.required]],
      description:["",[Validators.required]]
    })
}

  constructor(private formbuilder:FormBuilder,private activatedRoute:ActivatedRoute,private interviewService:InterviewService) { }


  creataInterview() {
    console.log(this.form.value);
    this.interviewService.createInterview(1,this.id,this.form.value).subscribe({

      next:response=>{
        console.log(response);
      },
      error:error=>{
        console.log(error);
      }

    });
  }

 


  




  

}
