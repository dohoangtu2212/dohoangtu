export interface IPager {
  page: number;
  totalPages: number;
  totalResults: number;
  sort: IPagerSort;
}

export type IPagerSort = "Created:-1";

export interface IVideo {
  id: string;
  duration: string;
  projectId: string;
  accountKey: string;
  region: string;
  image: {
    xsUrl: string;
    smUrl: string;
    mdUrl: string;
    lgUrl: string;
  };
  captions: string[];
  key: string;
  channelKey: string;
  privateLink: string;
  iframeLink: string;
  hlsLink: string;
  planType: 1;
  mp4Url: string;
  mp4Urls: string[];
  formats: {
    hls: boolean;
    mp4: boolean;
    options: {
      secureMp4: boolean;
    };
  };
  hlsUrl: string;
  hlsUrlWeb: string;
  title: string;
  description: string;
  options: {
    autoplay: boolean;
    playerColor: string;
    playerSkin: string;
    controlsColor: string;
    seekButtons: boolean;
    volumeControl: boolean;
    preload: string;
    fullscreenControl: boolean;
    controls: boolean;
    stickyControls: boolean;
    defaultQuality: string;
    qualityControl: boolean;
    speedControl: boolean;
    fastForward: boolean;
    bigPlayControl: boolean;
    playControl: boolean;
    volume: number;
    loop: boolean;
    muted: boolean;
    linkSharing: boolean;
    modal: boolean;
    resumePlayback: boolean;
  };
  tags: string[];
  version: number;
  status: number;
  created: string;
}

export interface IGetVideosResponse {
  pager: IPager;
  videos: IVideo[];
}

export interface IUploadVideoResponse {
  channelKey: string;
  iframeLink: string;
  privateLink: string;
  uploadId: string;
  videoId: string;
  videoKey: string;
}

// channelKey: "mwE2hVj6t0CCeakG9EL1bQ"
// iframeLink: "Spe6pbXxOkWcu470NNMoiw"
// privateLink: "Sq0IfALAk2OuaqIvKwUQ"
// uploadId: "0c1706da-0404-4bf3-9f34-5b48938f1b7a"
// videoId: "roSThF6rUyK5yYPu7ymUw"
// videoKey: "ar41QDlF7USYR2n3XHyg"
