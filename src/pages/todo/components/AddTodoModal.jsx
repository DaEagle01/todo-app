/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from "../../../redux/features/todo/todoSlice";

const { Option } = Select;

const TodoForm = ({ initialValues, onFormInstanceReady }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);
    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <Form.Item
                name="title"
                label="Task Title"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the task title!',
                    },
                ]}
            >
                <Input size='large' placeholder='Enter task title' />
            </Form.Item>
            <Form.Item
                name="priority"
                label="Task Priority"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the task title!',
                    },
                ]}
            >
                <Select size='large' placeholder="Select task priority">
                    <Option value="low" >Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                </Select>
            </Form.Item>
        </Form >
    );
};

const TodoModal = ({ open, setOpen, modalType, setModalType, selectedTodo, setSelectedTodo }) => {
    const [formInstance, setFormInstance] = useState();
    const dispatch = useDispatch();
    const addTodo = modalType === 'Add';

    const onCreate = (values) => {
        if (addTodo) {
            dispatch(addTask({
                title: values.title,
                priority: values.priority,
                completed: false,
                key: Date.now()
            }));
        } else {
            dispatch(editTask({
                key: selectedTodo.key,
                updatedTask: {
                    title: values.title,
                    priority: values.priority
                }
            }));
        }
        setOpen(false);
        handleCancelModal();
    };

    const handleCancelModal = () => {
        setOpen(false);
        setModalType('');
        setSelectedTodo({});
    };

    const initialValues = {
        modifier: 'public',
    }

    return (
        <Modal
            open={open}
            title={addTodo ? "Create a new todo" : "Update this todo"}
            okText={addTodo ? "Create Todo" : "Update Todo"}
            cancelText="Cancel"
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={handleCancelModal}
            maskClosable={false}
            destroyOnClose
            onOk={async () => {
                try {
                    const values = await formInstance?.validateFields();
                    formInstance?.resetFields();
                    onCreate(values);
                } catch (error) {
                    console.log('Failed:', error);
                }
            }}
        >
            <TodoForm
                initialValues={addTodo ? initialValues : selectedTodo}
                onFormInstanceReady={(instance) => {
                    setFormInstance(instance);
                }}
            />
        </Modal>
    );
};
export default TodoModal;

