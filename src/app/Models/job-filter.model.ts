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
  jobCategory: string;
  description: string;
  requirements?: string[];
  postedDate: string;
  isRemote: boolean;
  companyLogo?: string;
  experienceLevel?: string;
  benefits?: string[];
  postedBy?: any;
  postedAt?: string;
  applicationDeadline?: string;
  contactEmail?: string;
  companyWebsite?: string;
}

export interface JobSearchResponse {
  jobs: JobModel[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface JobPostModel {
  title: string;
  description: string;
  location: string;
  salaryRange?: string;
  jobCategory: string;
  jobType: string;
  postedBy?: string;
  postedAt?: string;
  company: string;
  requirements ?: string[];
  isRemote: boolean;
  experienceLevel?: string;
  benefits ?: string[];
  companyLogo?: string;
  applicationDeadline?: string;
  contactEmail?: string;
  companyWebsite?: string;
}
