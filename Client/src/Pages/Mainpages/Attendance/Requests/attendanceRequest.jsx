import React from "react";
import { useSelector } from "react-redux";
import {
  useGetUserAttendanceQuery,
  useGetAllAttendanceQuery,
  useApproveAttendanceMutation,
  useRejectAttendanceMutation,
} from "../../../../redux/slices/api/attendanceApiSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
  FaUserClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const AttendanceDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: userAttendance } = useGetUserAttendanceQuery();
  const { data: allAttendance } = useGetAllAttendanceQuery(null, {
    skip: !user.isAdmin && !user.isManager,
  });
  const [approveAttendance] = useApproveAttendanceMutation();
  const [rejectAttendance] = useRejectAttendanceMutation();


  const handleApprove = async (id) => {
    try {
      await approveAttendance(id).unwrap();
      alert("Attendance approved successfully!");
    } catch (error) {
      console.error("Error approving attendance:", error);
      alert(error.data?.message || "Error approving attendance");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAttendance(id).unwrap();
      alert("Attendance rejected successfully!");
    } catch (error) {
      console.error("Error rejecting attendance:", error);
      alert(error.data?.message || "Error rejecting attendance");
    }
  };

  // Filter attendance records to show only requests from non-manager employees
  const employeeRequests = allAttendance?.attendanceRecords?.filter(
    (record) => record.user.role !== "Admin" && record.user.role !== "Manager"
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Dashboard
      </Typography>

      {/* Top Section with Rounded Cards and Icons */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Card sx={{ flex: 1, mx: 1, borderRadius: 3, textAlign: "center" }}>
          <CardContent>
            <FaCalendarCheck size={30} color="#4caf50" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Attendance Days
            </Typography>
            <Typography variant="h4">
              {userAttendance?.attendanceRecords?.length || 0}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, mx: 1, borderRadius: 3, textAlign: "center" }}>
          <CardContent>
            <FaUserClock size={30} color="#ff9800" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Pending Requests
            </Typography>
            <Typography variant="h4">
              {employeeRequests?.filter(
                (record) => record.approvalStatus === "Pending"
              ).length || 0}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, mx: 1, borderRadius: 3, textAlign: "center" }}>
          <CardContent>
            <FaCheckCircle size={30} color="#2196f3" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Approved Records
            </Typography>
            <Typography variant="h4">
              {employeeRequests?.filter(
                (record) => record.approvalStatus === "Approved"
              ).length || 0}
            </Typography>
          </CardContent>
        </Card>

        {/* Rejected Requests Card */}
        <Card sx={{ flex: 1, mx: 1, borderRadius: 3, textAlign: "center" }}>
          <CardContent>
            <FaExclamationTriangle size={30} color="#f44336" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Rejected Requests
            </Typography>
            <Typography variant="h4">
              {employeeRequests?.filter(
                (record) => record.approvalStatus === "Rejected"
              ).length || 0}
            </Typography>
          </CardContent>
        </Card>
      </Box>

     

      {/* Attendance Records Table with Improved UI */}
      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Employee Attendance Requests
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeRequests?.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.user.name}</TableCell>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{record.approvalStatus}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleApprove(record._id)}
                      sx={{ mx: 1, borderRadius: 3 }}
                    >
                      <FaCheckCircle style={{ marginRight: 5 }} /> Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleReject(record._id)}
                      sx={{ borderRadius: 3 }}
                    >
                      <FaTimesCircle style={{ marginRight: 5 }} /> Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AttendanceDashboard;
