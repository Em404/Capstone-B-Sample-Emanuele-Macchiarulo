import { Component, Input, OnInit } from '@angular/core';
import { ISample, ISampleDetail } from '../../models/i-sample';
import { ApiService } from '../../services/api.service';
import { LoginService } from '../../services/login.service';
import { SampleService } from '../../services/sample.service';
import { SampleDetailService } from '../../services/sample-detail.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss'
})
export class SampleComponent {

  @Input() data!: ISampleDetail
  // sampleDetail!: ISampleDetail

  constructor(private sampleDetailSvc: SampleDetailService){}

  // ngOnInit(): void {
    // this.sampleDetail = this.sampleDetailSvc.getDataDetail()
  // }

  setShowPrev(detail: ISampleDetail) {
    this.data = {
      ...this.data,
      showPrev: (typeof this.data?.showPrev === undefined) ? true : !this.data?.showPrev,
      previews: detail.previews,
      description: detail.description,
      type: detail.type,
      filesize: detail.filesize,
      duration: detail.duration,
      username: detail.username,
      images: detail.images,
    }
  }

  // setSampleDetail(newSampleDetail: ISampleDetail) {
  //   this.sampleDetail = newSampleDetail
  // }

  handleClickDetails() {
    this.sampleDetailSvc.getDetailSample(this.data.id)
    this.setShowPrev(this.sampleDetailSvc.getDataDetail())
    console.log(this.data);

    // this.setSampleDetail(this.sampleDetailSvc.getDataDetail())
  }

  handleDownload() {
    this.sampleDetailSvc.downloadSample(this.data.id)
  }

}
