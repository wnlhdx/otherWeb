import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const PlansTable = () => {
  const [plans, setPlans] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const baseAPI = "http://192.168.1.3:8080/plans";

  useEffect(() => {
    fetchPlans(); // 获取现有的所有计划数据
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${baseAPI}/all`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleAdd = () => {
    setCurrentPlan({
      planName: "",
      timeStart: null,
      timeEnd: null,
      planDetails: "",
      projectName: "",
      projectDetails: "",
      nightTimeStart: null,
      nightTimeEnd: null,
      projectFinishPercent: "",
      dayOfWeek: "",
      bookName: "",
      bookContent: "",
      majorIn: "",
      projectMonth: "",
      projectYear: "",
      relaxItem: "",
      relaxItemForeign: "",
      typeOfLearn: "",
      typeDetail: "",
      standardLearn: "",
      updateTime: null,
      bookPage:""
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (planName) => {
    try {
      await fetch(`${baseAPI}/delete/${planName}`, {
        method: "DELETE",
      });
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleSave = async () => {
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${baseAPI}/update` : `${baseAPI}/add`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPlan),
      });
      if (response.ok) {
        fetchPlans();
        setOpenDialog(false);
      } else {
        console.error("Error saving plan");
      }
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  const renderField = (label, value, onChange, type = "text") => (
    <TextField
      label={label}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      margin="normal"
      type={type}
    />
  );

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        startIcon={<AddIcon />}
      >
        添加计划
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(currentPlan || {}).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.planName}>
                {Object.values(plan).map((value, index) => (
                  <TableCell key={index}>{value || "—"}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => handleEdit(plan)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(plan.planName)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? "编辑计划" : "添加计划"}</DialogTitle>
        <DialogContent>
          {Object.keys(currentPlan || {}).map((key) => {
            const isDateTimeField = key.toLowerCase().includes("time");
            return isDateTimeField ? (
              <DateTimePicker
                key={key}
                label={key}
                value={currentPlan[key]}
                onChange={(value) =>
                  setCurrentPlan((prev) => ({ ...prev, [key]: value }))
                }
                renderInput={(props) => (
                  <TextField {...props} fullWidth margin="normal" />
                )}
              />
            ) : (
              renderField(
                key,
                currentPlan[key],
                (value) =>
                  setCurrentPlan((prev) => ({ ...prev, [key]: value }))
              )
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            取消
          </Button>
          <Button onClick={handleSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlansTable;
