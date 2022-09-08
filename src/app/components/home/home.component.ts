import { Component, OnInit } from '@angular/core';
import { StoriesResponseModel } from 'src/app/models/stories-response-model';
import { StoryModel } from 'src/app/models/story-model';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private storiesResponse: StoriesResponseModel | undefined = undefined;

  constructor(private storyService: StoryService) {}

  async ngOnInit() {
    this.storiesResponse = await this.storyService.fetchStories();
  }

  get stories(): StoryModel[] {
    if (this.storiesResponse?._embedded.stories) {
      return this.storiesResponse._embedded.stories;
    }

    return [];
  }
}
