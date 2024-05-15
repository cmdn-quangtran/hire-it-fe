import React from "react";
import ButtonCreate from "./UploadButton";
import SearchJobUpload from "./UploadSearchJob";
function UploadJobs() {
  return (
    <div className="upload-jobs-container">
      <ButtonCreate />
      <SearchJobUpload />
    </div>
  );
}
export default UploadJobs;
