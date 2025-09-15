import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreDataService {
  private baseUrl: string = "";


  private getAllJob = 'api/GetAllJobs';
  private SaveJob = 'api/PostJob';
  private GetJobfilter = 'api/SearchJobs';

  private login = 'api/LoginSignUp/login';
  private Signup = 'api/LoginSignUp/signup';

  constructor(private http: HttpClient)
  {
    if (window.location.origin.includes("localhost")) {
      this.baseUrl = "https://localhost:44303/";

    }
    else {

      this.baseUrl = window.location.origin + "/api/";

    }

    this.getAllJob = this.baseUrl + this.getAllJob;
    this.SaveJob = this.baseUrl + this.SaveJob;
    this.GetJobfilter = this.baseUrl + this.GetJobfilter;

    this.login = this.baseUrl + this.login;
    this.Signup = this.baseUrl + this.Signup;

  }

  getAllJobs():Observable<any> {
    return this.http.get(this.getAllJob);
  }

  SaveJobData(jobData: any):Observable<any> {
    return this.http.post(this.SaveJob, jobData);
  }

  GetJobfilterData(filterData: any):Observable<any> {
    let params = new HttpParams()
    .set('title', filterData.JobTitle)
    .set('location', filterData.location)
    .set('category', filterData.category)
    .set('type', filterData.jobType );

  return this.http.get(this.GetJobfilter, { params });
  }

  loginData(loginData: any):Observable<any> {
    return this.http.post(this.login, loginData);
  }

  signupData(signupData: any):Observable<any> {
    return this.http.post(this.Signup, signupData);
  }


}
