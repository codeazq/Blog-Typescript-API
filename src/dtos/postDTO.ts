export interface IPostDTO {
  id: number,
  title: string,
  body: string,
  user_id: number,
  created_at?: string,
  updated_at?: string,
}

export interface ICreatePostDTO {
  title: string,
  body: string,
  user_id: number,
}

export interface IUpdatePostDTO {
  title: string,
  body: string,
}