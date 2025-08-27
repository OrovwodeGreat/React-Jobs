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
     
// ...existing code...
      const isLocalhost = window.location.hostname === "localhost";
      const apiUrl = isLocalhost
        ? (isHome
            ? "/api/jobs?_limit=3"
            : "/api/jobs")
        : (isHome
            ? "https://68aed6f8b91dfcdd62ba76ee.mockapi.io/jobs/Jobs?page=1&limit=3"
            : "https://68aed6f8b91dfcdd62ba76ee.mockapi.io/jobs/Jobs");
;
// ...existing code...

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


export default JobListings