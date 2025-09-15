export interface JobFilterModel {
  JobTitle?: string;
  location?: string;
  category?: string;
  jobType?: string;
}

export interface JobModel {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  category: string;
  description: string;
  requirements?: string[];
  postedDate: string;
  isRemote: boolean;
  companyLogo?: string;
  experienceLevel?: string;
  benefits?: string[];
}

export interface JobSearchResponse {
  jobs: JobModel[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
