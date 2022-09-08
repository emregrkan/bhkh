import { ResponseModel } from './response-model';
import { StoryModel } from './story-model';

export interface StoriesResponseModel
  extends ResponseModel<'stories', StoryModel> {}
