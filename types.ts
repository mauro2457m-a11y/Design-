export enum DesignType {
  LOGO = 'Logo',
  COVER = 'Capa',
  BANNER = 'Banner',
  POST = 'Post',
}

export interface Design {
  id: string;
  type: DesignType;
  imageUrl: string;
  prompt: string;
}
