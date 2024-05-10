import httpRequest from "./httpRequest";


const get_all_jobs= async () => {
    const res = await  httpRequest.get('employee/get-all-jobs/');
    return res;
}

const jobService = { get_all_jobs };
export default  jobService;