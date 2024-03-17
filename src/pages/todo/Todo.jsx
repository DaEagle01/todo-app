import { Button, Checkbox, Typography, Space, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
const { Title } = Typography;
import TodoModal from './components/AddTodoModal';
import { deleteTask, selectTasks, toggleTask } from '../../redux/features/todo/todoSlice';
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons"
import { useEffect, useState } from 'react';

const filterOptions = [
  {
    text: 'Low',
    value: 'low',
  },
  {
    text: 'Medium',
    value: 'medium',
  },
  {
    text: 'High',
    value: 'high',
  },
];

const Todo = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTodo, setSelectedTodo] = useState({});
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileDevice = windowWidth <= 480;

  const handleModal = (todo) => {
    setOpen(true);
    if (todo.title) {
      setModalType('Update');
      setSelectedTodo(todo)
    } else {
      setModalType('Add');
    }
  }

  const columns = [
    {
      width: isMobileDevice ? 20 : 50,
      cellPaddingBlock: 8,
      render: (todo) => (
        <Checkbox onChange={() => dispatch(toggleTask(todo.key))} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, todo) => <p style={{ textDecoration: todo.completed ? 'line-through' : '', color: todo.completed ? 'gray' : 'black' }}>{title}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      width: 150,
      render: (completed) => <p>{completed ? 'Completed' : 'Incomplete'}</p>,
    },
    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
      filters: filterOptions,
      onFilter: (value, record) => record.priority.indexOf(value) === 0,
      render: (tag) => {
        let color = tag === 'low' ? 'geekblue' : tag === 'medium' ? 'green' : tag === 'high' ? 'volcano' : null;
        return (
          <Tag color={color} key={tag}>
            {tag}
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (todo) => (
        <Space size="middle">
          <EditTwoTone onClick={() => handleModal(todo)} style={{ fontSize: "1.25rem" }} />
          <DeleteTwoTone onClick={() => dispatch(deleteTask(todo.key))} twoToneColor="#f5222d" style={{ fontSize: "1.25rem" }} />
        </Space>
      ),
    },
  ];

  const completedTasks = tasks.filter(task => task.completed === true);

  return (
    <div style={{ minHeight: "100vh", width: "100%", maxWidth: "64rem", margin: "0 auto", padding: isMobileDevice ? "0 0.5rem" : "0 1.5rem" }}>
      <Title style={{ textAlign: "center", fontSize: "1.875rem", lineHeight: "2.25rem", fontWeight: 600, margin: "2.5rem 0" }}>My Todo List</Title>
      <div>
        <div style={{ marginBottom: "1.25rem" }}>
          <Button
            onClick={handleModal}
            style={{ background: 'linear-gradient(100deg, #0958d9, #5cdbd3)', height: "max-content", fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600, color: "white" }}
          >
            Add Todo
          </Button>
        </div>
        <div className="">
          <Table
            columns={columns}
            dataSource={tasks}
            footer={() => (
              <div>
                <p><span style={{ fontWeight: 500 }}>Total tasks:</span> {tasks.length}</p>
                <p><span style={{ fontWeight: 500 }}>Completed tasks:</span> {completedTasks.length}</p>
              </div>
            )}
          />
        </div>
      </div>

      <TodoModal open={open} setOpen={setOpen} modalType={modalType} setModalType={setModalType} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
    </div>
  )
}

export default Todo;