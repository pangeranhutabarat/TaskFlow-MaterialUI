import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Checkbox,
  MenuItem,
  Snackbar,
  Alert,
  LinearProgress,
  Paper,
  InputAdornment
} from '@mui/material';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

const initialTasks = [
  {
    id: 1,
    title: 'Menyelesaikan tugas PAW',
    course: 'Pengembangan Aplikasi Web',
    due: '2026-11-03',
    priority: 'Tinggi',
    done: false
  },
  {
    id: 2,
    title: 'Membaca materi analisis data',
    course: 'Analisis Data',
    due: '2026-11-05',
    priority: 'Sedang',
    done: false
  },
  {
    id: 3,
    title: 'Membuat rangkuman materi',
    course: 'Kuliah',
    due: '2026-10-30',
    priority: 'Rendah',
    done: true
  }
];

const storageKey = 'taskflow-mui-tasks-v1';
const emptyForm = { title: '', course: '', due: '', priority: 'Sedang' };
const priorityColors = {
  Tinggi: 'error',
  Sedang: 'warning',
  Rendah: 'success'
};

function readTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(data) ? data : initialTasks;
  } catch {
    return initialTasks;
  }
}

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Checkbox
            checked={task.done}
            onChange={() => onToggle(task.id)}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              fontWeight={700}
              sx={{ textDecoration: task.done ? 'line-through' : 'none' }}
            >
              {task.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {task.course || 'Mata kuliah tidak ditentukan'}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
              <Chip
                size="small"
                label={task.done ? 'Selesai' : task.priority}
                color={task.done ? 'success' : priorityColors[task.priority]}
                variant="outlined"
              />
              {task.due && (
                <Chip
                  size="small"
                  label={`Tenggat: ${task.due}`}
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          <Tooltip title="Edit tugas">
            <IconButton onClick={() => onEdit(task)}>
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Hapus tugas">
            <IconButton color="error" onClick={() => onDelete(task.id)}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
}

function DashboardPage({ tasks, onAdd }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;

  const stats = [
    {
      label: 'Total Tugas',
      value: total,
      icon: <AssignmentRoundedIcon color="primary" />
    },
    {
      label: 'Belum Selesai',
      value: pending,
      icon: <PendingActionsRoundedIcon color="warning" />
    },
    {
      label: 'Selesai',
      value: done,
      icon: <AssignmentTurnedInRoundedIcon color="success" />
    }
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography color="text.secondary">
          Pantau progres tugas kuliahmu dalam satu tempat.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {stats.map((item) => (
          <Grid item xs={12} sm={4} key={item.label}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography color="text.secondary">{item.label}</Typography>
                  {item.icon}
                </Stack>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6">Progres Pengerjaan</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {done} dari {total} tugas selesai
          </Typography>
          <LinearProgress
            variant="determinate"
            value={total ? (done / total) * 100 : 0}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </CardContent>
      </Card>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Tugas Terbaru</Typography>
        <Button component={Link} to="/tugas">
          Lihat Semua
        </Button>
      </Stack>

      {tasks.slice(0, 3).map((task) => (
        <Card key={task.id}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography fontWeight={700}>{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.course}
                </Typography>
              </Box>
              <Chip
                label={task.done ? 'Selesai' : 'Belum selesai'}
                color={task.done ? 'success' : 'warning'}
                size="small"
              />
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onAdd}>
          Tambah Tugas
        </Button>
      </Box>
    </Stack>
  );
}

function TasksPage({ tasks, onAdd, onToggle, onEdit, onDelete }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchQuery = `${task.title} ${task.course}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchFilter =
        filter === 'Semua'
          ? true
          : filter === 'Selesai'
          ? task.done
          : !task.done;

      return matchQuery && matchFilter;
    });
  }, [tasks, query, filter]);

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4">Daftar Tugas</Typography>
          <Typography color="text.secondary">
            Kelola dan perbarui semua tugas kuliah.
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onAdd}>
          Tambah Tugas
        </Button>
      </Stack>

      <Paper sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Cari tugas"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              )
            }}
          />

          <TextField
            select
            label="Status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: { sm: 180 } }}
          >
            <MenuItem value="Semua">Semua</MenuItem>
            <MenuItem value="Belum selesai">Belum selesai</MenuItem>
            <MenuItem value="Selesai">Selesai</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <TaskCard
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>

      {filteredTasks.length === 0 && (
        <Alert severity="info">
          Tidak ada tugas yang cocok dengan pencarian atau filter.
        </Alert>
      )}
    </Stack>
  );
}

export default function App() {
  const location = useLocation();
  const [tasks, setTasks] = useState(readTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      course: task.course,
      due: task.due,
      priority: task.priority
    });
    setDialogOpen(true);
  };

  const saveTask = () => {
    const title = form.title.trim();
    if (!title) return;

    if (editingId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId ? { ...task, ...form, title } : task
        )
      );
      setMessage('Tugas berhasil diperbarui.');
    } else {
      setTasks((prev) => [
        {
          ...form,
          title,
          id: Date.now(),
          done: false
        },
        ...prev
      ]);
      setMessage('Tugas berhasil ditambahkan.');
    }

    setDialogOpen(false);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm('Hapus tugas ini?');
    if (!confirmDelete) return;

    setTasks((prev) => prev.filter((task) => task.id !== id));
    setMessage('Tugas berhasil dihapus.');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 'auto' }}>
            <ChecklistRoundedIcon color="primary" />
            <Typography variant="h6">TaskFlow</Typography>
          </Stack>

          <Button
            component={Link}
            to="/"
            startIcon={<DashboardRoundedIcon />}
            variant={location.pathname === '/' ? 'contained' : 'text'}
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            to="/tugas"
            startIcon={<ChecklistRoundedIcon />}
            variant={location.pathname === '/tugas' ? 'contained' : 'text'}
          >
            Tugas
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route
            path="/"
            element={<DashboardPage tasks={tasks} onAdd={openAdd} />}
          />
          <Route
            path="/tugas"
            element={
              <TasksPage
                tasks={tasks}
                onAdd={openAdd}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={deleteTask}
              />
            }
          />
        </Routes>
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingId !== null ? 'Edit Tugas' : 'Tambah Tugas Baru'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              fullWidth
              label="Nama Tugas"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <TextField
              fullWidth
              label="Mata Kuliah"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />

            <TextField
              fullWidth
              type="date"
              label="Tenggat Waktu"
              InputLabelProps={{ shrink: true }}
              value={form.due}
              onChange={(e) => setForm({ ...form, due: e.target.value })}
            />

            <TextField
              select
              fullWidth
              label="Prioritas"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <MenuItem value="Rendah">Rendah</MenuItem>
              <MenuItem value="Sedang">Sedang</MenuItem>
              <MenuItem value="Tinggi">Tinggi</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={saveTask}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
      >
        <Alert severity="success" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}