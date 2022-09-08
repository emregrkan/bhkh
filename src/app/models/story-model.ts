export interface StoryModel {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  _links: {
    self: {
      href: string;
    };
    story: {
      href: string;
    };
    votes: {
      href: string;
    };
    author: {
      href: string;
    };
    characters: {
      href: string;
    };
    comments: {
      href: string;
    };
  };
}
