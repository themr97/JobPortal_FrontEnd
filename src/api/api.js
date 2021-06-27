export const server = "http://localhost:4444";

const api = {
    login: `${server}/auth/login`,
    signup: `${server}/auth/signup`,
    uploadResume: `${server}/upload/resume`,
    jobs: `${server}/api/jobs`,
    applications: `${server}/api/applications`,
    user: `${server}/api/user`,
    applicants: `${server}/api/applicants`,
};

export default api;