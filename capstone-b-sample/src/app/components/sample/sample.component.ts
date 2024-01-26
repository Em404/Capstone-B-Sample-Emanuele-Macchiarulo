import { AfterViewInit, Component, Input } from '@angular/core';
import { ISampleDetail } from '../../models/i-sample';
import { SampleDetailService } from '../../services/sample-detail.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent {
  @Input() data!: ISampleDetail;

  constructor(private sampleDetailSvc: SampleDetailService) {}

  preferiti: ISampleDetail[] = [];
  loading: boolean = false;
  loadingDetails: boolean = false;

  // public get loading() :boolean {
  //   return this.sampleDetailSvc.loading
  // }

  setShowPrev(detail: ISampleDetail) {
    this.data = {
      ...this.data,
      showPrev:
        typeof this.data?.showPrev === undefined ? true : !this.data?.showPrev,
      previews: detail.previews,
      description: detail.description,
      type: detail.type,
      filesize: detail.filesize,
      duration: detail.duration,
      username: detail.username,
      images: detail.images,
    };
  }

  handleClickDetails() {
    if(!this.data.showPrev)
    this.setLoading('loadingDetails', true);
    this.sampleDetailSvc.getDetailSample(this.data.id);
    setTimeout(() => {
      this.setShowPrev(this.sampleDetailSvc.getDataDetail());
      console.log(this.data);
      this.setLoading('loadingDetails', false);
    }, 500);
  }

  setLoading(loadingType: string, flag: boolean) {
    switch (loadingType) {
      case 'loadingDetails':
        this.loadingDetails = flag;
        break;
      case 'loading':
        this.loading = flag;
        break;
      default:
        return;
    }
  }

  handleDownload() {
    this.setLoading('loading', true);
    this.sampleDetailSvc
      .downloadSample(this.data.id)
      .then(() => this.setLoading('loading', false));
  }

  handleFavourite() {
    this.sampleDetailSvc.addToFavourite(this.data);
  }

  isFavourite() {
    return this.sampleDetailSvc.checkFavourite(this.data);
  }

  // handleRemoveFavourite() {
  //   this.sampleDetailSvc.deleteFromFavourite(this.data.id)
  // }
}
