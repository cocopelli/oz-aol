import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SongComponent} from './song.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SongComponent', () => {
  let component: SongComponent;
  let fixture: ComponentFixture<SongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SongComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SongComponent', () => {
    expect(component).toBeTruthy();
  })
});
