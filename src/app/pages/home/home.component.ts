import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Project } from '../../models/project';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NzCardModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule,
    NzTagModule,
    NzPaginationModule,
    CommonModule,
    FormsModule,
    NzInputModule,
    NzFloatButtonModule,
    NzModalModule,
    NzStepsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  searchText: string = '';
  isVisible: boolean = false;
  isOkLoading: boolean = false;

  current = 0;
  index: string = 'Project Information';
  isEdit: boolean = false;
  id!: number;

  private fb = inject(NonNullableFormBuilder);

  constructor(private service: AppService, private router: Router) {}

  formFieldsProject = [
    {
      controlName: 'name',
      label: 'Project Name',
      placeholder: 'Enter Project Name',
      type: 'text',
      errorMessage: 'Please input your Project Name!',
      require: true,
    },
    {
      controlName: 'path',
      label: 'Project Path',
      placeholder: 'Enter Project Path',
      type: 'text',
      errorMessage: 'Please input your Project Path!',
      require: true,
    },
  ];

  formFields = [
    {
      controlName: 'mysql_host',
      label: 'Mysql Host',
      placeholder: 'Enter Mysql Host',
      type: 'text',
      errorMessage: 'Please input your Mysql Host!',
      require: true,
    },
    {
      controlName: 'mysql_port',
      label: 'Mysql Port',
      placeholder: 'Enter Mysql Port',
      type: 'number',
      errorMessage: 'Please input your Mysql Port!',
      require: true,
    },
    {
      controlName: 'mysql_user',
      label: 'Mysql User',
      placeholder: 'Enter Mysql User',
      type: 'text',
      errorMessage: 'Please input your Mysql User!',
      require: true,
    },
    {
      controlName: 'mysql_database',
      label: 'Mysql Database',
      placeholder: 'Enter Mysql Database',
      type: 'text',
      errorMessage: 'Please input your Mysql Database!',
      require: true,
    },
    {
      controlName: 'mysql_password',
      label: 'Mysql Password',
      placeholder: 'Enter Mysql Password',
      type: 'text',
      errorMessage: 'Please input your Mysql Password!',
      require: true,
    },
    {
      controlName: 'first_superuser',
      label: 'First Superuser Email',
      placeholder: 'Enter First Superuser Email',
      type: 'text',
      errorMessage: 'Please input your First Superuser Email!',
      require: true,
    },
    {
      controlName: 'first_name_superuser',
      label: 'First Name Superuser',
      placeholder: 'Enter First Name Superuser',
      type: 'text',
      errorMessage: 'Please input your First Name Superuser!',
      require: false,
    },
    {
      controlName: 'last_name_superuser',
      label: 'Last Name Superuser',
      placeholder: 'Enter Last Name Superuser',
      type: 'text',
      errorMessage: 'Please input your Last Name Superuser!',
      require: false,
    },
    {
      controlName: 'first_superuser_password',
      label: 'First Superuser Password',
      placeholder: 'Enter First Superuser Password',
      type: 'text',
      errorMessage: 'Please input your First Superuser Password!',
      require: true,
    },
  ];

  anotherFormFields = [
    {
      controlName: 'domain',
      label: 'Domain',
      placeholder: 'Enter Domain (e.g., localhost)',
      type: 'text',
      errorMessage: 'Please input your Domain!',
      defaultValue: 'localhost',
    },
    {
      controlName: 'stack_name',
      label: 'Stack Name',
      placeholder: 'Enter Stack Name',
      type: 'text',
      errorMessage: 'Please input your Stack Name!',
    },
    {
      controlName: 'server_name',
      label: 'Server Name',
      placeholder: 'Enter Server Name',
      type: 'text',
      errorMessage: 'Please input your Server Name!',
    },
    {
      controlName: 'server_host',
      label: 'Server Host',
      placeholder: 'Enter Server Host',
      type: 'text',
      errorMessage: 'Please input your Server Host!',
    },
    {
      controlName: 'secret_key',
      label: 'Secret Key',
      placeholder: 'Enter Secret Key',
      type: 'text',
      errorMessage: 'Please input your Secret Key!',
    },
    {
      controlName: 'smtp_tls',
      label: 'SMTP TLS',
      placeholder: 'Enable SMTP TLS',
      type: 'number',
      errorMessage: 'Please specify SMTP TLS!',
    },
    {
      controlName: 'smtp_port',
      label: 'SMTP Port',
      placeholder: 'Enter SMTP Port',
      type: 'number',
      errorMessage: 'Please input your SMTP Port!',
    },
    {
      controlName: 'smtp_host',
      label: 'SMTP Host',
      placeholder: 'Enter SMTP Host',
      type: 'text',
      errorMessage: 'Please input your SMTP Host!',
    },
    {
      controlName: 'smtp_user',
      label: 'SMTP User',
      placeholder: 'Enter SMTP User',
      type: 'text',
      errorMessage: 'Please input your SMTP User!',
    },
    {
      controlName: 'smtp_password',
      label: 'SMTP Password',
      placeholder: 'Enter SMTP Password',
      type: 'password',
      errorMessage: 'Please input your SMTP Password!',
    },
    {
      controlName: 'smtp_server',
      label: 'SMTP Server',
      placeholder: 'Enter SMTP Server',
      type: 'text',
      errorMessage: 'Please input your SMTP Server!',
      defaultValue: 'smtp.gmail.com',
    },
    {
      controlName: 'emails_from_email',
      label: 'Emails From Email',
      placeholder: 'Enter Emails From Email',
      type: 'email',
      errorMessage: 'Please input a valid email!',
    },
  ];

  validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    path: this.fb.control('', [Validators.required]),

    mysql_host: this.fb.control('localhost', [Validators.required]),
    mysql_port: this.fb.control(3306, [Validators.required]),
    mysql_user: this.fb.control('', [Validators.required]),
    mysql_password: this.fb.control('', [Validators.required]),
    mysql_database: this.fb.control('', [Validators.required]),

    first_superuser: this.fb.control('', [Validators.required]),
    last_name_superuser: this.fb.control(''),
    first_name_superuser: this.fb.control(''),
    first_superuser_password: this.fb.control('', [Validators.required]),

    domain: this.fb.control(''),
    stack_name: this.fb.control(''),
    server_name: this.fb.control(''),
    server_host: this.fb.control(''),
    secret_key: this.fb.control(''),
    smtp_tls: this.fb.control(false),
    smtp_port: this.fb.control(''),
    smtp_host: this.fb.control(''),
    smtp_user: this.fb.control(''),
    smtp_password: this.fb.control(''),
    smtp_server: this.fb.control(''),
    emails_from_email: this.fb.control(''),
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  get paginatedProjects(): Project[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.projects.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
  getProjects() {
    this.service.readAllProject().subscribe((data) => {
      this.projects = data;
      console.log(this.projects);
    });
  }

  ngOnInit() {
    this.getProjects();
  }

  deleteProject(id: number) {
    this.service.deleteProject(+id).subscribe((data) => {
      console.log(data);
      this.getProjects();
    });
  }

  archiveProject(id: number) {
    // Implémentez la logique pour archiver le projet
  }

  editConfiguration(id: number) {
    this.validateForm.reset();
    this.isEdit = true;
    this.id = id;
    this.current = 0;
    this.service.openProject(id).subscribe((data) => {
      this.validateForm?.get('name')?.setValue(data?.name);
      this.validateForm?.get('path')?.setValue(data?.path);
      this.validateForm.patchValue(data.config);
      this.isVisible = true;
    });
  }

  editProject(id: number) {
    this.id = id;
    this.router.navigate(['project', id]);
  }

  showModal(): void {
    // Implémentez la logique pour afficher le modal
    this.validateForm.reset();
    this.isVisible = true;
    this.current = 0;
    this.isEdit = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void {
    let body = {
      name: this.validateForm?.value.name,
      path: this.validateForm?.value.path,
      config: this.validateForm?.value,
    };
    if (this.isEdit) {
      this.service.updateConfig(this.id, body).subscribe((data) => {
        console.log(data);
        this.getProjects();
        this.isVisible = false;
      });
    } else {
      this.service.createConfig(body).subscribe((data) => {
        console.log(data);
        this.getProjects();
        this.isVisible = false;
      });
    }
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'Project Information';
        break;
      }
      case 1: {
        this.index = 'Mysql And User Information';
        break;
      }
      case 2: {
        this.index = 'Another Confoguration';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
}
