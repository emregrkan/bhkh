import { Component, Input, OnInit } from '@angular/core';
import { StoryModel } from 'src/app/models/story-model';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css'],
})
export class StoryCardComponent {
  @Input() story: StoryModel | undefined = undefined;
}
