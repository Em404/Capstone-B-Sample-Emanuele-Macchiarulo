import { Component, Input } from '@angular/core';
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
    this.sampleDetailSvc.getDetailSample(this.data.id);
    setTimeout(() => {
      this.setShowPrev(this.sampleDetailSvc.getDataDetail());
      console.log(this.data);
    }, 500);
  }

  handleDownload() {
    this.sampleDetailSvc.downloadSample(this.data.id);
  }

  handleFavourite() {
    this.sampleDetailSvc.addToFavourite(this.data)
  }

  isFavourite() {
    return this.sampleDetailSvc.checkFavourite(this.data)
  }

  // handleRemoveFavourite() {
  //   this.sampleDetailSvc.deleteFromFavourite(this.data.id)
  // }

}
