import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const API = "http://localhost:5000/api/candidates";

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editId, setEditId] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Applied");

  // GET ALL CANDIDATES

  const getCandidates = async () => {

    try {

      const res = await axios.get(API);

      console.log("Candidates:", res.data);

      setCandidates(res.data);

    } catch (error) {

      console.error(error);

      alert("Could not fetch candidates");

    }

  };

  // LOAD AUTOMATICALLY

  useEffect(() => {
    getCandidates();
  }, []);

  // CLEAR FORM

  const clearForm = () => {

    setFullName("");
    setEmail("");
    setSkills("");
    setExperience("");
    setStatus("Applied");

  };

  // ADD CANDIDATE

  const addCandidate = async () => {

    try {

      await axios.post(API, {
        fullName,
        email,
        skills,
        experience,
        status
      });

      alert("Candidate Added");

      clearForm();

      getCandidates();

    } catch (error) {

      console.error(error);

    }

  };

  // DELETE

  const deleteCandidate = async (id) => {

    try {

      await axios.delete(`${API}/${id}`);

      alert("Candidate Deleted");

      getCandidates();

    } catch (error) {

      console.error(error);

    }

  };

  // EDIT

  const editCandidate = (candidate) => {

    setEditId(candidate._id);

    setFullName(candidate.fullName);
    setEmail(candidate.email);
    setSkills(candidate.skills);
    setExperience(candidate.experience);
    setStatus(candidate.status);

  };

  // UPDATE

  const updateCandidate = async () => {

    try {

      await axios.put(`${API}/${editId}`, {
        fullName,
        email,
        skills,
        experience,
        status
      });

      alert("Candidate Updated");

      setEditId(null);

      clearForm();

      getCandidates();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Candidate Dashboard</h1>

      <h2>
        {editId ? "Edit Candidate" : "Add Candidate"}
      </h2>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="Rejected">Rejected</option>
      </select>

      <br /><br />

      {editId ? (

        <button onClick={updateCandidate}>
          Update Candidate
        </button>

      ) : (

        <button onClick={addCandidate}>
          Add Candidate
        </button>

      )}

      <hr />

      <button onClick={getCandidates}>
        Refresh / View All Candidates
      </button>

      <h3>
        Total Candidates: {candidates.length}
      </h3>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {candidates.length === 0 ? (

            <tr>
              <td colSpan="6">
                No Candidates Found
              </td>
            </tr>

          ) : (

            candidates.map((candidate) => (

              <tr key={candidate._id}>

                <td>{candidate.fullName}</td>
                <td>{candidate.email}</td>
                <td>{candidate.skills}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.status}</td>

                <td>

                  <button
                    onClick={() =>
                      setSelectedCandidate(candidate)
                    }
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      editCandidate(candidate)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteCandidate(candidate._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <hr />

      {selectedCandidate && (

        <div>

          <h2>Candidate Details</h2>

          <p>
            <strong>Name:</strong>{" "}
            {selectedCandidate.fullName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {selectedCandidate.email}
          </p>

          <p>
            <strong>Skills:</strong>{" "}
            {selectedCandidate.skills}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {selectedCandidate.experience}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedCandidate.status}
          </p>

        </div>

      )}

    </div>

  );

}

export default Dashboard;