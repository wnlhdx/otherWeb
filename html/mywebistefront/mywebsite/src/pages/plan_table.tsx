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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 

// 定义Plan类型
interface Plan {
  planName: string;
  timeStart: Date;
  timeEnd: Date;
  planDetails: string;
  projectName: string;
  projectDetails: string;
  nightTimeStart: Date;
  nightTimeEnd: Date;
  projectFinishPercent: string;
  dayOfWeek: string;
  bookName: string;
  bookContent: string;
  majorIn: string;
  projectMonth: string;
  projectYear: string;
  relaxItem: string;
  relaxItemForeign: string;
  typeOfLearn: string;
  typeDetail: string;
  standardLearn: string;
  updateTime: Date;
  bookPage: string;
}

const PlansTablePage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const baseAPI = "http://192.168.1.3:8080/plans";

  useEffect(() => {
    fetchPlans(); // 获取现有的所有计划数据
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${baseAPI}/all`);
      const data = await response.json();
      data.sort((a: Plan, b: Plan) => {
        if (a.hasOwnProperty("timeStart") && b.hasOwnProperty("timeStart")) {
          return new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime();
        }
        return 0;
      });
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleAdd = () => {
    setCurrentPlan({
      planName: '',
      timeStart: dayjs().toDate(),
      timeEnd: dayjs().toDate(),
      planDetails: '',
      projectName: '',
      projectDetails: '',
      nightTimeStart: dayjs().toDate(),
      nightTimeEnd: dayjs().toDate(),
      projectFinishPercent: '',
      dayOfWeek: '',
      bookName: '',
      bookContent: '',
      majorIn: '',
      projectMonth: '',
      projectYear: '',
      relaxItem: '',
      relaxItemForeign: '',
      typeOfLearn: '',
      typeDetail: '',
      standardLearn: '',
      updateTime: dayjs().toDate(),
      bookPage: ''
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEdit = (plan: Plan) => {
    setCurrentPlan(plan);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (planName: string) => {
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

      // 自动设置 updateTime 为当前时间
      const planToSave: Plan = {
        ...currentPlan!,
        updateTime: dayjs().toDate(),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planToSave),
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

  const handleFieldChange = (key: keyof Plan, value: any) => {
    setCurrentPlan((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const renderField = (label: string, value: any, onChange: (value: any) => void, type: string = "text") => (
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
                {Object.keys(plan).map((key) => {
                  const typedKey = key as keyof Plan; 
                  const value = plan[typedKey];
                  const isTimeField = key.toLowerCase().includes("time");
                  return (
                    <TableCell key={key}>
                      {isTimeField ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label={key}
                            value={value ? dayjs(value) : null}
                            onChange={(newValue) =>
                              handleFieldChange(key as keyof Plan, newValue)
                            }
                          />
                        </LocalizationProvider>
                      ) : (
                        <TextField
                          value={value}
                          onChange={(e) =>
                            handleFieldChange(key as keyof Plan, e.target.value)
                          }
                          fullWidth
                          variant="standard"
                        />
                      )}
                    </TableCell>
                  );
                })}
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
            const typedKey = key as keyof Plan;
            const isTimeField = typedKey.toLowerCase().includes("time");
            return isTimeField ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  key={typedKey}
                  label={typedKey}
                  // 将值转换为 Dayjs 类型
                  value={currentPlan![typedKey] ? dayjs(currentPlan![typedKey]) : null}
                  onChange={(value) =>
                    setCurrentPlan((prev) =>
                      prev ? { ...prev, [typedKey]: value } : prev
                    )
                  }
                />
              </LocalizationProvider>
            ) : (
              renderField(
                typedKey,
                currentPlan![typedKey],
                (value) =>
                  setCurrentPlan((prev) =>
                    prev ? { ...prev, [typedKey]: value } : prev
                  )
              )
            );
          })}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PlansTablePage;
