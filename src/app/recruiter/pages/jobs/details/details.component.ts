import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferResponseDto } from 'src/app/recruiter/services/models/offer-response-dto';
import { CandidacyService } from 'src/app/recruiter/services/service/candidacy.service';
import { OfferService } from 'src/app/recruiter/services/service/offer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

/**
 * Details Component 
 */
export class DetailsComponent implements OnInit {


  breadCrumbItems: Array<{}>;

  constructor(private candidacyService:CandidacyService,private offerService:OfferService,private route:ActivatedRoute) { }
  id:number;
  offer:OfferResponseDto;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Job Details', active: true }];
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.offerService.getOffer(this.id).subscribe(data=>{
      this.offer=data;
    })

  }
  apply(event:any) {

      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger ms-2'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons
          .fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            confirmButtonText: 'Yes, apply for this job',
            cancelButtonText: 'No, cancel!',
            showCancelButton: true
          })
          .then(result => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                
                'you have applied to this Job',
                'success'
              );
              event.target.closest('.card')?.remove();
              const offerId=Number(this.route.snapshot.paramMap.get('id'));
                this.candidacyService.candidate(1,offerId).subscribe(data=>{
                  console.log("response:",data.offerResponseDTO);
                })

             
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your User is still persisted :)',
                'error'
              );
            }
          });

    
    
  }
  




}
