export interface Params<T> {
  params: { slug: T }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type FilterSlug = 'domains'|'emailsto'|'emailsfrom'|'cc'|'subject';
export type Mode = 'edit'|'create'

export interface FilterParams {
  sortby?:string,
  q?:string,
  [key:string]:string|undefined
}