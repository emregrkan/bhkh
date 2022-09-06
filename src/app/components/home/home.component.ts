import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private storiesResponse: any = null;
  loadedStories: any[] | null = null;

  constructor(private storyService: StoryService) {}

  async ngOnInit() {
    this.storiesResponse = await this.storyService.getStories();

    if (this.storiesResponse.hasOwnProperty('_embedded')) {
      this.loadedStories = this.storiesResponse['_embedded'].stories;
    }
  }
}
