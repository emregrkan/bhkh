import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiStoriesUrl = `${environment.api}/stories`;
  private stories = null;

  constructor(private authService: AuthService) {}

  private async fetchStories(
    page: any = undefined,
    size: any = undefined,
    sort: any = undefined
  ) {
    const accessToken = await this.authService.getAccessToken();

    const response = await fetch(this.apiStoriesUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    return await response.json();
  }

  async getStories() {
    if (!this.stories) {
      this.stories = await this.fetchStories();
    }

    return this.stories;
  }
}
