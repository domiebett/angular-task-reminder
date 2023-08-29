import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  showAddTask: boolean = false;
  subscription!: Subscription;

  addTaskForm: FormGroup = new FormGroup({
    text: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    day: new FormControl(null, [Validators.required]),
    reminder: new FormControl(false)
  });

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  get text(): AbstractControl<any, any> | null {
    return this.addTaskForm.get('text');
  }

  get day(): AbstractControl<any, any> | null {
    return this.addTaskForm.get('day');
  }

  get reminder(): AbstractControl<any, any> | null {
    return this.addTaskForm.get('reminder');
  }

  resetForm() {
    this.text?.reset();
    this.day?.reset()
    this.reminder?.reset();
  }

  onSubmit() {
    const newTask = {
      text: this.text?.value,
      day: this.day?.value,
      reminder: this.reminder?.value,
    };

    this.onAddTask.emit(newTask);

    this.resetForm();
  }
}
