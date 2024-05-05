import httpRequest from "./httpRequest";

const get_information = async () => {
  const res = await httpRequest.get("user/get-information/");
  return res;
};

const send_email_with_job = async (data) => {
  const res = await httpRequest.post("recruiter/send-email/", {
    ...data,
  });
  return res;
};

const send_email_with_cv = async (data) => {
  console.log(data);
  const res = await httpRequest.post("employee/send-email/", {
    ...data,
  });
  return res;
};

const verify_cv = async (data) => {
  const res = await httpRequest.post("employee/verify-cv/", {
    ...data,
  });
  return res;
};

const userService = {
  get_information,
  send_email_with_job,
  send_email_with_cv,
  verify_cv,
};
export default userService;
