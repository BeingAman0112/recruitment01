import { Component, OnInit } from '@angular/core';
import { CoreDataService } from '../../Common/core-data.service';
import { JobFilterModel, JobModel, JobSearchResponse } from '../../Models/job-filter.model';

@Component({
  selector: 'app-jobs',
  templateUrl: '../Template/jobs.component.html',
  styleUrl: '../Style/jobs.component.css'
})
export class JobsComponent implements OnInit {
  jobs: JobModel[] = [];
  filteredJobs: JobModel[] = [];
  loading: boolean = false;
  error: string = '';

  // Make Math available in template
  Math = Math;

  // Filter properties
  searchKeyword: string = '';
  selectedLocation: string = '';
  selectedCategory: string = '';
  selectedJobType: string = '';
  selectedSalaryRange: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  // Categories for filter dropdown
  categories: string[] = [
    'IT',
    'Marketing',
    'Healthcare',
    'Finance',
    'Education',
    'Engineering',
    'Sales',
    'Human Resources'
  ];

  // Job types for filter
  jobTypes: string[] = [
    'Full-time',
    'Part-time',
    'Contract',
    'Remote',
    'Internship'
  ];

  constructor(private coreDataService: CoreDataService) { }

  ngOnInit(): void {
    this.loadAllJobs();
  }

  loadAllJobs(): void {
    this.loading = true;
    this.error = '';

    this.coreDataService.getAllJobs().subscribe({
      next: (response) => {
        console.log(response, "Jobs");
        this.jobs = response.map((job : any) => ({
          ...job,
          requirements: job.requirements ? job.requirements.split(',') : [],
          benefits: job.benefits ? job.benefits.split(',') : []
        }));

        this.filteredJobs = [...this.jobs];
        this.calculatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.error = 'Failed to load jobs. Please try again later.';
        this.loading = false;
        // For demo purposes, load sample data if API fails
        // this.loadSampleJobs();
      }
    });
  }

  searchJobs(): void {
    // If no filters are applied, load all jobs instead
    if (!this.hasActiveFilters()) {
      this.loadAllJobs();
      return;
    }

    // Create filter model with current search criteria
    const filterData: JobFilterModel = {
      JobTitle: this.searchKeyword.trim(),
      location: this.selectedLocation.trim(),
      category: this.selectedCategory,
      jobType: this.selectedJobType,
    };

    console.log('Searching jobs with filter:', filterData);

    this.loading = true;
    this.error = '';
    this.currentPage = 1; // Reset to first page when searching

    this.coreDataService.GetJobfilterData(filterData).subscribe({
      next: (response) => {
        console.log('Filter API response:', response);

        // Handle different response formats
        if (response && Array.isArray(response)) {
          // If response is directly an array of jobs
          this.filteredJobs = response;
        } else if (response && response.jobs && Array.isArray(response.jobs)) {
          // If response has a jobs property with array
          this.filteredJobs = response.jobs;
        } else if (response && response.data && Array.isArray(response.data)) {
          // If response has a data property with array
          this.filteredJobs = response.data;
        } else {
          // Fallback to empty array
          this.filteredJobs = [];
        }

        this.calculatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error filtering jobs:', error);
        this.error = 'Failed to search jobs. Please try again.';
        this.loading = false;

        // Fallback to client-side filtering if API fails
        this.clientSideFilter();
      }
    });
  }

  clientSideFilter(): void {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesKeyword = !this.searchKeyword ||
        job.title?.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        job.company?.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        job.description?.toLowerCase().includes(this.searchKeyword.toLowerCase());

      const matchesLocation = !this.selectedLocation ||
        job.location?.toLowerCase().includes(this.selectedLocation.toLowerCase());

      const matchesCategory = !this.selectedCategory ||
        job.jobCategory === this.selectedCategory;

      const matchesJobType = !this.selectedJobType ||
        job.jobType === this.selectedJobType;

      return matchesKeyword && matchesLocation && matchesCategory && matchesJobType;
    });

    this.calculatePagination();
  }

  clearFilters(): void {
    this.searchKeyword = '';
    this.selectedLocation = '';
    this.selectedCategory = '';
    this.selectedJobType = '';
    this.selectedSalaryRange = '';
    this.currentPage = 1;

    // Reload all jobs when filters are cleared
    this.loadAllJobs();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredJobs.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  get paginatedJobs(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredJobs.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // If we have active filters, search with the new page
      if (this.hasActiveFilters()) {
        this.searchJobsWithPagination(page);
      }
    }
  }

  // Check if any filters are currently active
  hasActiveFilters(): boolean {
    return !!(this.searchKeyword || this.selectedLocation || this.selectedCategory ||
              this.selectedJobType || this.selectedSalaryRange);
  }

  // Search jobs with specific page number (for pagination)
  searchJobsWithPagination(pageNumber: number): void {
    const filterData: JobFilterModel = {
      JobTitle: this.searchKeyword || '',
      location: this.selectedLocation || '',
      category: this.selectedCategory || '',
      jobType: this.selectedJobType || '',
    };

    this.loading = true;
    this.error = '';

    this.coreDataService.GetJobfilterData(filterData).subscribe({
      next: (response) => {
        console.log('Pagination API response:', response);

        // Handle different response formats
        if (response && Array.isArray(response)) {
          this.filteredJobs = response;
        } else if (response && response.jobs && Array.isArray(response.jobs)) {
          this.filteredJobs = response.jobs;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.filteredJobs = response.data;
        } else {
          this.filteredJobs = [];
        }

        this.calculatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading page:', error);
        this.error = 'Failed to load page. Please try again.';
        this.loading = false;
      }
    });
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Recently posted';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }

  // Handle job application
  applyForJob(job: JobModel): void {
    console.log('Applying for job:', job);
    // Here you can implement the application logic
    // For example, navigate to application form or open modal
    alert(`Applying for: ${job.title} at ${job.company}`);
  }

  // Handle save job
  saveJob(job: JobModel): void {
    console.log('Saving job:', job);
    // Here you can implement the save job logic
    // For example, add to favorites or saved jobs list
    alert(`Job saved: ${job.title}`);
  }
}
