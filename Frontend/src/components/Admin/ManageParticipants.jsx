import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { useConfig } from "../../contexts/useConfig";

const ManageParticipants = () => {
  const [registrations, setRegistrations] = useState([]);
  const { apiUrl } = useConfig();

  const fetchRegistrations = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v2/registrations`);
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const headers = [
    { label: "Team Name", key: "teamName" },
    { label: "Team Lead Name", key: "teamLeadName" },
    { label: "Email", key: "email" },
    { label: "Member 1", key: "member1" },
    { label: "Member 2", key: "member2" },
    { label: "Member 3", key: "member3" },
    { label: "Member 4", key: "member4" },
    { label: "Event ID", key: "eventId" },
  ];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Manage Participants</h1>
      <div className="mb-4">
        <CSVLink
          data={registrations}
          headers={headers}
          filename={"participants.csv"}
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
        >
          Export to CSV
        </CSVLink>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Team Name</th>
            <th className="px-4 py-2">Team Lead Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Member 1</th>
            <th className="px-4 py-2">Member 2</th>
            <th className="px-4 py-2">Member 3</th>
            <th className="px-4 py-2">Member 4</th>
            <th className="px-4 py-2">Event ID</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id}>
              <td className="px-4 py-2">{reg.teamName}</td>
              <td className="px-4 py-2">{reg.teamLeadName}</td>
              <td className="px-4 py-2">{reg.email}</td>
              <td className="px-4 py-2">{reg.member1}</td>
              <td className="px-4 py-2">{reg.member2}</td>
              <td className="px-4 py-2">{reg.member3}</td>
              <td className="px-4 py-2">{reg.member4}</td>
              <td className="px-4 py-2">{reg.eventId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageParticipants;
