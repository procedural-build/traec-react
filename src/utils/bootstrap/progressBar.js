import React from "react";

export default function ProgressBar({ title, percentage }) {
  return (
    <div className="col-sm">
      <p className="text-muted mb-1 ">{title}</p>
      <div class="progress ">
        <div
          class="progress-bar bg-dark"
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={`${percentage}%`}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
}
