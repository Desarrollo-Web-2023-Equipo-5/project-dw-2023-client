import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss'],
})
export class CreateCampaignComponent {
  get user() {
    return this.auth.activeUser;
  }

  campaignForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    playersNeeded: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  createPost() {
    const { title, description, playersNeeded } = this.campaignForm.value;
    const campaign = {
      title,
      description,
      playersNeeded,
      creator: this.user.id,
    };
    this.api.createCampaign(campaign).subscribe({
      next: (id: string) => {
        if (id) {
          this.toastr.success('Campaign created successfully!');
          this.campaignForm.reset();
          this.router.navigate(['/dashboard/campaign-details', id]);
        }
      },
      error: err => {
        console.error(err);
        this.toastr.error(err.error.errors[0].msg);
      },
    });
    return this.campaignForm.value;
  }
}
