import {useState, useEffect} from 'react';
import Spinner from './Spinner';
import JobListing from './JobListing';

const JobListings = ({isHome = false}) => {
    const [jobs, setJobs]= useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchJobs = async () => {
      const isLocalhost = window.location.hostname === "localhost";
      const apiUrl = isHome
        ? "http://localhost:8000/jobs?_limit=3"
        : "https://my-json-server.typicode.com/OrovwodeGreat/React-Jobs-Api/jobs?_limit=3";

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (!mounted) return;
        // If using the typicode API, jobs may be under 'jobs' property
        const jobsData = Array.isArray(data) ? data : data.jobs || [];
        setJobs(jobsData);
      } catch (err) {
        if (!mounted) return;
        // Optionally set error state if you have it
        // setError(err.message ?? "Failed to load jobs");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
     <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : 'Browse Jobs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {loading ? <Spinner loading={loading} />: (
            <>
            {jobs.map((job) => (
                <JobListing key={job.id} job={job}/>
            ))} 
            </>
           )
           }

                
          </div>
        </div>
      </section>
  )
}




// // src/pages/JobsPage.jsx
// import { useEffect, useState } from "react";
// import { fetchJobs } from "../services/jobsApi";
// import { Link } from "react-router-dom";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
   
//   }, []);

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">All Jobs</h1>

//       {loading ? (
//         <p>Loading jobs…</p>
//       ) : error ? (
//         <p className="text-red-600">Error: {error}</p>
//       ) : jobs.length === 0 ? (
//         <p>No jobs available.</p>
//       ) : (
//         <ul className="space-y-4">
//           {jobs.map((job) => (
//             <li key={job.id} className="p-4 border rounded-lg">
//               <Link to={`/jobs/${job.id}`} className="block">
//                 <h2 className="text-lg font-semibold">{job.title}</h2>
//                 <p className="text-sm text-gray-600">
//                   {job.company?.name ?? job.company}
//                 </p>
//                 {job.description && (
//                   <p className="mt-2 text-sm text-gray-700">
//                     {job.description.length > 160
//                       ? `${job.description.slice(0, 160)}…`
//                       : job.description}
//                   </p>
//                 )}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// }


export default JobListings