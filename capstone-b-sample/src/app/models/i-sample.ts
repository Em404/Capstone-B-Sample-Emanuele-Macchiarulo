export interface ISample {
  id: number
  name: string
  tags: string []
  showPrev?: boolean
}

export interface ISampleDetail extends ISample {
  description: string
  type: string
  filesize: number
  duration: number
  username: string
  images: string
  previews: string
}

export interface ISampleObj {
  count?: number
  results: ISampleDetail []
  next?: string
  previous?: string
}

