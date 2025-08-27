import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import HomePages from './pages/HomePages';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';



const API_BASE = 'https://my-json-server.typicode.com/OrovwodeGreat/React-Jobs-Api/jobs';

const App = () => {
  // Add new Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
      const created = await res.json();
      // navigate to jobs so the new item is visible (simple reload/navigation)
      window.location.href = '/jobs';
      return created;
    } catch (err) {
      console.error('Add job failed', err);
      throw err;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      // go back to jobs list so UI reflects deletion
      window.location.href = '/jobs';
      return true;
    } catch (err) {
      console.error('Delete job failed', err);
      throw err;
    }
  };

  // update Job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`${API_BASE}/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });
      const updated = await res.json();
      // redirect to the job page to show updated data
      window.location.href = `/jobs/${job.id}`;
      return updated;
    } catch (err) {
      console.error('Update job failed', err);
      throw err;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePages />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />

        <Route path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob}/>}
          loader={jobLoader} />

        <Route path='/jobs/:id'
          element={<JobPage
            deleteJob={deleteJob} />}
          loader={jobLoader} />

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
};

export default App;
