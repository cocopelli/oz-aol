import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ListComponent} from './list.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ListComponent', () => {
    expect(component).toBeTruthy();
  });
});
