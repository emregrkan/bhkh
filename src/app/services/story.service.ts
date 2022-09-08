import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StoriesResponseModel } from '../models/stories-response-model';
import { StoryModel } from '../models/story-model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiStoriesUrl = `${environment.api}/stories`;

  constructor(private authService: AuthService) {}

  async fetchStories(
    page: any = undefined,
    size: any = undefined,
    sort: any = undefined
  ): Promise<StoriesResponseModel> {
    const accessToken = await this.authService.getAccessToken();

    const response = await fetch(this.apiStoriesUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    return (await response.json()) as Promise<StoriesResponseModel>;
  }
}
