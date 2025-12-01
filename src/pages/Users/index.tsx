import React, { useState } from "react";
import usersData from "../../assets/usersData.json";
import "./index.css";
// 为JSON数据添加类型断言
type UsersData = User[];
import {
  Card,
  Table,
  Input,
  Button,
  Space,
  Typography,
  Form,
  Select,
  DatePicker,
  Modal,
  Switch,
  message,
} from "antd";

import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

// 用户数据接口定义
interface User {
  id: number;
  loginName: string;
  userName: string;
  department: string;
  phone: string;
  status: boolean;
  createTime: string;
}

const Users = () => {
  // 添加类型断言，确保TypeScript能正确识别JSON数据类型
  const initialData = usersData as UsersData;

  // 状态管理 - 直接在初始值中设置数据，避免在useEffect中同步调用setState
  const [users, setUsers] = useState<User[]>(initialData);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialData);

  const [searchForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState<User | null>(null);
  const pageSize = 10;

  // 新增表单实例
  const [addForm] = Form.useForm();
  // 新增模态框可见性
  const [isAddVisible, setIsAddVisible] = useState(false);

  // 搜索功能
  const handleSearch = async () => {
    const formValues = await searchForm.validateFields();
    const { loginName, phone, status, createTime } = formValues;

    let filtered = users;

    // 根据登录名称过滤
    if (loginName) {
      filtered = filtered.filter((user) =>
        user.loginName.toLowerCase().includes(loginName.toLowerCase())
      );
    }

    // 根据手机号码过滤
    if (phone) {
      filtered = filtered.filter((user) => user.phone.includes(phone));
    }

    // 根据用户状态过滤
    if (status !== undefined) {
      filtered = filtered.filter((user) => user.status === status);
    }

    // 根据创建时间过滤
    if (createTime && createTime.length === 2) {
      const [start, end] = createTime;
      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createTime);
        return userDate >= start && userDate <= end;
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // 重置到第一页
    message.success(`搜索完成，找到 ${filtered.length} 条记录`);
  };

  // 重置搜索条件
  const handleReset = () => {
    searchForm.resetFields();
    setFilteredUsers(users);
    setCurrentPage(1); // 重置到第一页
    message.success("搜索条件已重置");
  };

  // 切换用户状态
  const handleStatusChange = (id: number, checked: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: checked } : user
      )
    );
    message.success(`用户${checked ? "启用" : "禁用"}成功`);
  };

  // 删除用户
  const handleDelete = (id: number) => {
    confirm({
      title: "确定要删除这个用户吗？",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setUsers(users.filter((user) => user.id !== id));
        message.success("用户删除成功");
      },
    });
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请选择要删除的用户");
      return;
    }
    confirm({
      title: `确定要删除选中的${selectedRowKeys.length}个用户吗？`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setUsers(users.filter((user) => !selectedRowKeys.includes(user.id)));
        setSelectedRowKeys([]);
        message.success("批量删除成功");
      },
    });
  };

  // 打开编辑模态框
  const handleEdit = (record: User) => {
    setCurrentEditUser(record);
    // 直接使用record数据，不转换createTime格式
    editForm.setFieldsValue(record);
    setIsEditVisible(true);
  };

  // 打开新增模态框
  const handleAdd = () => {
    setIsAddVisible(true);
    addForm.resetFields();
  };

  // 关闭编辑模态框
  const handleEditClose = () => {
    setIsEditVisible(false);
    editForm.resetFields();
    setCurrentEditUser(null);
  };

  // 关闭新增模态框
  const handleAddClose = () => {
    setIsAddVisible(false);
    addForm.resetFields();
  };

  // 保存编辑
  const handleEditSave = async () => {
    try {
      const values = await editForm.validateFields();
      if (currentEditUser) {
        // 保留原始的createTime格式（字符串）
        const updatedValues = {
          ...values,
          // 确保createTime是字符串格式
          createTime:
            typeof values.createTime === "string"
              ? values.createTime
              : values.createTime &&
                typeof values.createTime.format === "function"
              ? values.createTime.format("YYYY-MM-DD HH:mm:ss")
              : currentEditUser.createTime,
        };

        // 更新原数据
        const updatedUsers = users.map((user) =>
          user.id === currentEditUser.id ? { ...user, ...updatedValues } : user
        );
        setUsers(updatedUsers);

        // 如果当前有过滤条件，也需要更新过滤后的数据
        if (filteredUsers.length !== users.length) {
          const updatedFilteredUsers = filteredUsers.map((user) =>
            user.id === currentEditUser.id
              ? { ...user, ...updatedValues }
              : user
          );
          setFilteredUsers(updatedFilteredUsers);
        } else {
          setFilteredUsers(updatedUsers);
        }

        message.success("用户编辑成功");
        handleEditClose();
      }
    } catch (errorInfo) {
      console.log("编辑表单验证失败:", errorInfo);
    }
  };

  // 保存新增
  const handleAddSave = async () => {
    try {
      const values = await addForm.validateFields();

      // 检查人名+手机号是否已存在
      const isDuplicate = users.some(
        (user) =>
          user.userName === values.userName && user.phone === values.phone
      );

      if (isDuplicate) {
        message.error("该用户名称和手机号码组合已存在");
        return;
      }

      // 创建新用户
      const newUser: User = {
        id: Math.max(...users.map((user) => user.id)) + 1, // 生成新ID
        ...values,
        createTime: new Date().toISOString().replace("T", " ").substring(0, 19), // 自动生成创建时间
        status: values.status !== undefined ? values.status : true, // 默认启用
      };

      // 添加到原数据
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);

      // 更新过滤后的数据
      if (filteredUsers.length !== users.length) {
        // 如果当前有过滤条件，简单更新为完整数据
        setFilteredUsers(updatedUsers);
      } else {
        setFilteredUsers(updatedUsers);
      }

      message.success("用户创建成功");
      handleAddClose();
    } catch (errorInfo) {
      console.log("创建失败:", errorInfo);
    }
  };

  // 导入用户
  const handleImport = () => {
    message.info("导入功能待实现");
  };

  // 导出用户
  const handleExport = () => {
    message.info("导出功能待实现");
  };

  // 更多操作
  const handleMore = (record: User) => {
    message.info(`更多操作：${record.userName}`);
  };

  // 分页数据
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 表格行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // 表格列定义
  const columns = [
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "登录名称",
      dataIndex: "loginName",
      key: "loginName",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "手机",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "用户状态",
      dataIndex: "status",
      key: "status",
      render: (_: boolean, record: User) => (
        <Switch
          checked={record.status}
          onChange={(checked) => handleStatusChange(record.id, checked)}
          className="status-switch" 
        />
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      sorter: (a: User, b: User) => a.createTime.localeCompare(b.createTime),
    },
    {
      title: "操作",
      key: "action",
      render: (_: unknown, record: User) => (
        <Space size="middle" className="table-operation-buttons">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="edit-btn"
            >
              编辑
            </Button>
            <Button type="link" danger onClick={() => handleDelete(record.id)} className="delete-btn">
              删除
            </Button>
            <Button type="link" onClick={() => handleMore(record)} className="more-btn">
              更多操作
            </Button>
          </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>用户管理</Title>

      <Card className="search-card">
        {/* 搜索筛选区域 */}
        <div className="search-container">
          <Form form={searchForm} layout="inline" style={{ marginBottom: 16 }}>
          <Space size={[16, 10]} wrap>
            <Form.Item label="登录名称" name="loginName">
              <Input placeholder="请输入登录名称" style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label="手机号码" name="phone">
              <Input placeholder="请输入手机号码" style={{ width: 150 }} />
            </Form.Item>

            <Form.Item label="用户状态" name="status">
              <Select placeholder="所有" style={{ width: 100 }}>
                <Option value="">所有</Option>
                <Option value={true}>启用</Option>
                <Option value={false}>禁用</Option>
              </Select>
            </Form.Item>

            <Form.Item label="创建时间" name="createTime">
              <RangePicker style={{ width: 300 }} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  className="search-btn"
                >
                  搜索
                </Button>
                <Button onClick={handleReset} className="reset-btn">
                  重置
                </Button>
              </Space>
            </Form.Item>
         </Space>
          </Form>

        </div>
      </Card>

      <Card className="table-card">
        {/* 操作按钮区域 */}
          <Space style={{ marginBottom: 16 }} className="operation-buttons">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="add-btn">
              新增
            </Button>
            <Button type="primary" icon={<EditOutlined />} disabled={selectedRowKeys.length !== 1} className="edit-btn">
              修改
            </Button>
            <Button type="primary" danger={true} icon={<DeleteOutlined />} onClick={handleBatchDelete} disabled={selectedRowKeys.length === 0} className="delete-btn">
              删除
            </Button>
            <Button type="primary" icon={<UploadOutlined />} onClick={handleImport} className="import-btn">
              导入
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport} className="export-btn">
              导出
            </Button>
          </Space>

        {/* 用户表格 */}
        <Table
          columns={columns}
          dataSource={paginatedUsers}
          rowKey="id"
          rowSelection={rowSelection}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredUsers.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
            showTotal: (total, range) =>
              `显示第 ${range[0]} 到第 ${range[1]} 条记录，总共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 新增用户模态框 */}
      <Modal
        title="新增用户"
        open={isAddVisible}
        onCancel={handleAddClose}
        footer={
          <Space>
            <Button onClick={handleAddClose}>取消</Button>
            <Button type="primary" onClick={handleAddSave}>
              确定
            </Button>
          </Space>
        }
      >
        <Form form={addForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="loginName"
            label="登录名称"
            rules={[
              { required: true, message: "请输入登录名称" },
              { max: 20, message: "登录名称不能超过20个字符" },
            ]}
          >
            <Input placeholder="请输入登录名称" />
          </Form.Item>

          <Form.Item
            name="userName"
            label="用户名称"
            rules={[
              { required: true, message: "请输入用户名称" },
              { max: 10, message: "用户名称不能超过10个字符" },
            ]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: "请选择部门" }]}
          >
            <Select placeholder="请选择部门">
              <Option value="研发部门">研发部门</Option>
              <Option value="测试部门">测试部门</Option>
              <Option value="产品部门">产品部门</Option>
              <Option value="设计部门">设计部门</Option>
              <Option value="销售部门">销售部门</Option>
              <Option value="市场部门">市场部门</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号码"
            rules={[
              { required: true, message: "请输入手机号码" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码" },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            name="status"
            label="用户状态"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑用户模态框 */}
      <Modal
        title="编辑用户"
        open={isEditVisible}
        onCancel={handleEditClose}
        footer={
          <Space>
            <Button onClick={handleEditClose}>取消</Button>
            <Button type="primary" onClick={handleEditSave}>
              保存
            </Button>
          </Space>
        }
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="loginName"
            label="登录名称"
            rules={[
              { required: true, message: "请输入登录名称" },
              { max: 20, message: "登录名称不能超过20个字符" },
            ]}
          >
            <Input placeholder="请输入登录名称" />
          </Form.Item>

          <Form.Item
            name="userName"
            label="用户名称"
            rules={[
              { required: true, message: "请输入用户名称" },
              { max: 10, message: "用户名称不能超过10个字符" },
            ]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: "请选择部门" }]}
          >
            <Select placeholder="请选择部门">
              <Option value="研发部门">研发部门</Option>
              <Option value="测试部门">测试部门</Option>
              <Option value="产品部门">产品部门</Option>
              <Option value="设计部门">设计部门</Option>
              <Option value="销售部门">销售部门</Option>
              <Option value="市场部门">市场部门</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号码"
            rules={[
              { required: true, message: "请输入手机号码" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码" },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item name="status" label="用户状态" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用"  />
          </Form.Item>

          <Form.Item name="createTime" label="创建时间">
            <Input placeholder="请输入创建时间" disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
