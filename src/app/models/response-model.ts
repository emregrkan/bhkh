export interface ResponseModel<K extends string, V> {
  _embedded: {
    [key in K]: V[];
  };
  _links: {
    self: {
      href: string;
    };
    profile: {
      href: string;
    };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
