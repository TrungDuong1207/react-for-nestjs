import { Button, Col, Form, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm } from '@ant-design/pro-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IProps {
    setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchClient = (props: IProps) => {
    const { setSearchText } = props;
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();
    const locationWindow = useLocation();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const { skills, location } = values;
        const pathName = locationWindow.pathname;
        let searchText: string = "";

        if (setSearchText && pathName === "/job") {
            let skillsString: string = skills.length > 0 ? `skills=${skills.join(",")}` : "";
            let locationString: string = location.length > 0 ? `location=${location.join(",")}` : "";

            if (skillsString && locationString) {
                searchText = `${skillsString}&${locationString}`;
            } else {
                searchText = skillsString || locationString;
            }

            if (searchText) {
                setSearchText(searchText);
            }
        } else {
            let skillsString: string = skills && skills.length > 0 ? `skills=${skills.join(",")}` : "";
            let locationString: string = location && location.length > 0 ? `location=${location.join(",")}` : "";

            if (skillsString && locationString) {
                searchText = `${skillsString}&${locationString}`;
            } else {
                searchText = skillsString || locationString;
            }

            navigate(searchText ? `/job?searchText=${encodeURIComponent(searchText)}` : "/job");
        }
    }

    return (
        <ProForm
            form={form}
            onFinish={onFinish}
            submitter={
                {
                    render: () => <></>
                }
            }
        >
            <Row gutter={[20, 20]}>
                <Col span={24}><h2>Việc Làm IT Cho Developer "Chất"</h2></Col>
                <Col span={24} md={16}>
                    <ProForm.Item
                        name="skills"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            showArrow={false}
                            style={{ width: '100%' }}
                            placeholder={
                                <>
                                    <MonitorOutlined /> Tìm theo kỹ năng...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsSkills}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} md={4}>
                    <ProForm.Item name="location">
                        <Select
                            mode="multiple"
                            allowClear
                            showArrow={false}
                            style={{ width: '100%' }}
                            placeholder={
                                <>
                                    <EnvironmentOutlined /> Địa điểm...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsLocations}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} md={4}>
                    <Button type='primary' onClick={() => form.submit()}>Search</Button>
                </Col>
            </Row>
        </ProForm>
    )
}
export default SearchClient;