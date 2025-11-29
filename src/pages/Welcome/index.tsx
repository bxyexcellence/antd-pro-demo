import { Card, Typography, Space, Divider, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Welcome = () => {
  return (
    <div>
      <Title level={2}>欢迎使用 Ant Design Pro</Title>
      <Paragraph>
        这是一个基于 React + Ant Design + TypeScript + Vite 构建的企业级中后台前端解决方案。
      </Paragraph>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card title="快速开始" bordered={false}>
            <Space direction="vertical">
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                已配置路由系统
              </Paragraph>
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                已配置布局系统
              </Paragraph>
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                已配置菜单导航
              </Paragraph>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="技术栈" bordered={false}>
            <Space direction="vertical">
              <Paragraph>⚛️ React 19.2.0</Paragraph>
              <Paragraph>🎨 Ant Design 6.0.0</Paragraph>
              <Paragraph>📘 TypeScript 5.9.3</Paragraph>
              <Paragraph>⚡ Vite 7.2.4</Paragraph>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="功能特性" bordered={false}>
            <Space direction="vertical">
              <Paragraph>🚀 快速热更新</Paragraph>
              <Paragraph>📦 极速构建</Paragraph>
              <Paragraph>🎯 类型安全</Paragraph>
              <Paragraph>📱 响应式设计</Paragraph>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;

