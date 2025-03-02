import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ClassModel, Project } from './models/project';

const BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders({
    Accept: 'application/json',
  });

  createProject(project_id: any, project: any) {
    let params = new HttpParams();
    params = params.append('project_id', project_id);
    return this.http.put(`${BASE_URL}/project`, project, {
      headers: this.headers,
      params,
    });
  }

  readAllProject() {
    let params = new HttpParams().append('limit', 10).append('skip', 0);
    return this.http.get<Project[]>(`${BASE_URL}/project/`, {
      headers: this.headers,
      params,
    });
  }

  createConfig(body: any) {
    return this.http.post<Project[]>(`${BASE_URL}/project/config`, body, {
      headers: this.headers,
    });
  }

  openProject(id: number) {
    let params = new HttpParams().append('project_id', id);
    return this.http.get<Project>(`${BASE_URL}/project/by_id`, {
      headers: this.headers,
      params,
    });
  }

  updateConfig(id: number, body: any) {
    let params = new HttpParams().append('project_id', id);
    return this.http.put<Project>(`${BASE_URL}/project/config`, body, {
      headers: this.headers,
      params,
    });
  }
}
