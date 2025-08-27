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



const API_BASE = 'https://68aed6f8b91dfcdd62ba76ee.mockapi.io/jobs';

const App = () => {
  // Add new Job
  const addJob = async (newJob) => {
    const res = await fetch("https://68aed6f8b91dfcdd62ba76ee.mockapi.io/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    return await res.json();
  };

};

// Delete Job
const deleteJob = async (id) => {
  await fetch(`https://68aed6f8b91dfcdd62ba76ee.mockapi.io/jobs/${id}`, {
    method: "DELETE",
  });
};

// update Job
const updateJob = async (id, updatedJob) => {
  const res = await fetch(`https://68aed6f8b91dfcdd62ba76ee.mockapi.io/jobs/${id}`, {
    method: "PUT",  // MockAPI accepts PUT or PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });

  return await res.json();
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePages />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />

      <Route path='/edit-job/:id'
        element={<EditJobPage updateJobSubmit={updateJob} />}
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

export default App;
