export interface IDappStore {
  id: string;
  name: string;
  image: string;
  link: string;
  creator: string;
  desc: string;
  status: number;
}

export interface ICreateDappStorePayload {
  name: string;
  link: string;
  creator: string;
  desc: string;
  image: string;
}
