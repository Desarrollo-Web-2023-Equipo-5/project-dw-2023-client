import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Campaign } from '../../interfaces/campaign.interface';

@Component({
  selector: 'app-campaign-selector-dialog',
  templateUrl: './campaign-selector-dialog.component.html',
  styleUrls: ['./campaign-selector-dialog.component.scss'],
})
export class CampaignSelectorDialogComponent {
  campaignOptions: Campaign[] = [];
  selectedCampaign: string = '';

  constructor(
    public dialogRef: MatDialogRef<CampaignSelectorDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.apiService.getCurrentUserCampaigns(this.data.userId).subscribe({
      next: (campaigns: Campaign[]) => {
        this.campaignOptions = campaigns;
      },
    });
  }
}
