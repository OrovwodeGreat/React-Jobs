import {Link} from 'react-router-dom'

// src/pages/AllJobsPage.jsx
import { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobsApi"; // ✅ central API helper
import { Link } from "react-router-dom";

function viewAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchJobs()
      .then((data) => {
        if (!mounted) return;
        setJobs(data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message ?? "Failed to load jobs");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Jobs</h1>

      {loading ? (
        <p>Loading jobs…</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="p-4 border rounded-lg">
              {/* Optional details link if you add /jobs/:id */}
              <Link to={`/jobs/${job.id}`} className="block">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">
                  {job.company?.name ?? job.company}
                </p>
                {job.description && (
                  <p className="mt-2 text-sm text-gray-700">
                    {job.description.length > 160
                      ? `${job.description.slice(0, 160)}…`
                      : job.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}


const viewAllJobs = () => {
  return (
    
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          to="/db"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Jobs
        </Link>
      </section>
  )
}



export default viewAllJobs