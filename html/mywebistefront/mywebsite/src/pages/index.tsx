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

  useEffect(() => {
    // 获取现有的所有计划数据
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/plans"); // 替换为你的后端接口
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleAdd = () => {
    setCurrentPlan({
      planName: "",
      timeStart: "",
      timeEnd: "",
      planDetails: "",
      projectName: "",
      projectDetails: "",
      nightTimeStart: "",
      nightTimeEnd: "",
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
      updateTime: "",
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
      await fetch(`/api/plans/${planName}`, {
        method: "DELETE",
      });
      fetchPlans(); // 删除后刷新数据
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleSave = async () => {
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/plans/${currentPlan.planName}` : "/api/plans";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPlan),
      });
      if (response.ok) {
        fetchPlans(); // 保存后刷新数据
        setOpenDialog(false);
      } else {
        console.error("Error saving plan");
      }
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleAdd} startIcon={<AddIcon />}>
        添加计划
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>计划名称</TableCell>
              <TableCell>开始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <TableCell>项目名称</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans
              .sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart)) // 按时间排序
              .map((plan) => (
                <TableRow key={plan.planName}>
                  <TableCell>{plan.planName}</TableCell>
                  <TableCell>{plan.timeStart}</TableCell>
                  <TableCell>{plan.timeEnd}</TableCell>
                  <TableCell>{plan.projectName}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(plan)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(plan.planName)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? "编辑计划" : "添加计划"}</DialogTitle>
        <DialogContent>
          <TextField
            label="计划名称"
            value={currentPlan?.planName}
            onChange={(e) => setCurrentPlan({ ...currentPlan, planName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <DateTimePicker
            label="开始时间"
            value={currentPlan?.timeStart}
            onChange={(date) => setCurrentPlan({ ...currentPlan, timeStart: date })}
            renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
          />
          <DateTimePicker
            label="结束时间"
            value={currentPlan?.timeEnd}
            onChange={(date) => setCurrentPlan({ ...currentPlan, timeEnd: date })}
            renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
          />
          <TextField
            label="计划详情"
            value={currentPlan?.planDetails}
            onChange={(e) => setCurrentPlan({ ...currentPlan, planDetails: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="项目名称"
            value={currentPlan?.projectName}
            onChange={(e) => setCurrentPlan({ ...currentPlan, projectName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="项目详情"
            value={currentPlan?.projectDetails}
            onChange={(e) => setCurrentPlan({ ...currentPlan, projectDetails: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="夜间开始时间"
            value={currentPlan?.nightTimeStart}
            onChange={(e) => setCurrentPlan({ ...currentPlan, nightTimeStart: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="夜间结束时间"
            value={currentPlan?.nightTimeEnd}
            onChange={(e) => setCurrentPlan({ ...currentPlan, nightTimeEnd: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="项目完成百分比"
            value={currentPlan?.projectFinishPercent}
            onChange={(e) => setCurrentPlan({ ...currentPlan, projectFinishPercent: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="星期几"
            value={currentPlan?.dayOfWeek}
            onChange={(e) => setCurrentPlan({ ...currentPlan, dayOfWeek: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="书籍名称"
            value={currentPlan?.bookName}
            onChange={(e) => setCurrentPlan({ ...currentPlan, bookName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="书籍内容"
            value={currentPlan?.bookContent}
            onChange={(e) => setCurrentPlan({ ...currentPlan, bookContent: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="专业方向"
            value={currentPlan?.majorIn}
            onChange={(e) => setCurrentPlan({ ...currentPlan, majorIn: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="项目月份"
            value={currentPlan?.projectMonth}
            onChange={(e) => setCurrentPlan({ ...currentPlan, projectMonth: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="项目年份"
            value={currentPlan?.projectYear}
            onChange={(e) => setCurrentPlan({ ...currentPlan, projectYear: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="放松项目"
            value={currentPlan?.relaxItem}
            onChange={(e) => setCurrentPlan({ ...currentPlan, relaxItem: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="外国放松项目"
            value={currentPlan?.relaxItemForeign}
            onChange={(e) => setCurrentPlan({ ...currentPlan, relaxItemForeign: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="学习类型"
            value={currentPlan?.typeOfLearn}
            onChange={(e) => setCurrentPlan({ ...currentPlan, typeOfLearn: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="学习详情"
            value={currentPlan?.typeDetail}
            onChange={(e) => setCurrentPlan({ ...currentPlan, typeDetail: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="标准学习内容"
            value={currentPlan?.standardLearn}
            onChange={(e) => setCurrentPlan({ ...currentPlan, standardLearn: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="更新时间"
            value={currentPlan?.updateTime}
            onChange={(e) => setCurrentPlan({ ...currentPlan, updateTime: e.target.value })}
            fullWidth
            margin="normal"
          />
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
