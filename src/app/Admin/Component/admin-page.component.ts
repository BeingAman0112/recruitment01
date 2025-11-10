import { Component, OnInit } from '@angular/core';
import { CoreDataService } from '../../Common/core-data.service';
import { JobPostModel } from '../../Models/job-filter.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: '../Template/admin-page.component.html',
  styleUrl: '../Style/admin-page.component.css'
})
export class AdminPageComponent implements OnInit {

  // Job posting form data
  jobPost: JobPostModel = {
    title: '',
    company: '',
    location: '',
    jobType: '',
    salaryRange: '',
    jobCategory: '',
    description: '',
    requirements : [],
    isRemote: false,
    experienceLevel: '',
    benefits : [],
    companyLogo: '',
    applicationDeadline: '',
    contactEmail: '',
    companyWebsite: ''
  };

  // Form state
  loading: boolean = false;
  success: boolean = false;
  error: string = '';

  // Temporary strings for adding requirements and benefits
  newRequirement: string = '';
  newBenefit: string = '';

  // Dropdown options
  categories: string[] = [
    'Technology',
    'Marketing',
    'Healthcare',
    'Finance',
    'Education',
    'Engineering',
    'Sales',
    'Human Resources',
    'Customer Service',
    'Operations',
    'Design',
    'Legal'
  ];

  jobTypes: string[] = [
    'Full-time',
    'Part-time',
    'Contract',
    'Remote',
    'Internship',
    'Freelance',
    'Temporary'
  ];

  experienceLevels: string[] = [
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Executive',
    'Internship',
    'No Experience Required'
  ];

  salaryRanges: string[] = [
    'Under $30k',
    '$30k - $50k',
    '$50k - $70k',
    '$70k - $100k',
    '$100k - $150k',
    'Above $150k',
    'Negotiable',
    'Competitive'
  ];

  constructor(private coreDataService: CoreDataService) { }

  ngOnInit(): void {
    // Initialize form with default values
    this.resetForm();
  }

  // Submit job posting
  submitJob(): void {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    // Prepare job data for API
    const jobData = {
      ...this.jobPost,
      requirements: this.jobPost.requirements ? this.jobPost.requirements.join(',') : '',
      benefits: this.jobPost.benefits ? this.jobPost.benefits.join(',') : '',
      id: 0, // Will be assigned by backend
      postedAt: new Date().toISOString(),
      postedBy: '205E6FC7-7711-4979-A0C0-6D912C6B3931'
    };

    console.log('Submitting job data:', jobData);

    this.coreDataService.SaveJobData(jobData).subscribe({
      next: (response) => {
        console.log('Job posted successfully:', response);
        this.success = true;
        this.loading = false;
        this.resetForm();

        // Show success message for 5 seconds
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Error posting job:', error);
        this.error = 'Failed to post job. Please try again.';
        this.loading = false;
      }
    });
  }

  // Form validation
  validateForm(): boolean {
    if (!this.jobPost.title.trim()) {
      this.error = 'Job title is required.';
      return false;
    }
    if (!this.jobPost.company.trim()) {
      this.error = 'Company name is required.';
      return false;
    }
    if (!this.jobPost.location.trim()) {
      this.error = 'Location is required.';
      return false;
    }
    if (!this.jobPost.jobCategory) {
      this.error = 'Category is required.';
      return false;
    }
    if (!this.jobPost.jobType) {
      this.error = 'Job type is required.';
      return false;
    }
    if (!this.jobPost.description.trim()) {
      this.error = 'Job description is required.';
      return false;
    }
    if (this.jobPost.contactEmail && !this.isValidEmail(this.jobPost.contactEmail)) {
      this.error = 'Please enter a valid email address.';
      return false;
    }

    this.error = '';
    return true;
  }

  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Add requirement to the list
  addRequirement(): void {
    if (this.newRequirement.trim()) {
      if (!this.jobPost.requirements) {
        this.jobPost.requirements = [];
      }
      this.jobPost.requirements.push(this.newRequirement.trim());
      this.newRequirement = '';
    }
  }

  // Remove requirement from the list
  removeRequirement(index: number): void {
    if (this.jobPost.requirements) {
      this.jobPost.requirements.splice(index, 1);
    }
  }

  // Add benefit to the list
  addBenefit(): void {
    if (this.newBenefit.trim()) {
      if (!this.jobPost.benefits) {
        this.jobPost.benefits = [];
      }
      this.jobPost.benefits.push(this.newBenefit.trim());
      this.newBenefit = '';
    }
  }

  // Remove benefit from the list
  removeBenefit(index: number): void {
    if (this.jobPost.benefits) {
      this.jobPost.benefits.splice(index, 1);
    }
  }

  // Reset form to initial state
  resetForm(): void {
    this.jobPost = {
      title: '',
      company: '',
      location: '',
      jobType: '',
      salaryRange: '',
      jobCategory: '',
      description: '',
      requirements : [],
      isRemote: false,
      experienceLevel: '',
      benefits : [],
      companyLogo: '',
      applicationDeadline: '',
      contactEmail: '',
      companyWebsite: ''
    };
    this.newRequirement = '';
    this.newBenefit = '';
    this.error = '';
    this.success = false;
  }

  // Clear all messages
  clearMessages(): void {
    this.error = '';
    this.success = false;
  }
}
