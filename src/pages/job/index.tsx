import SearchClient from '@/components/client/search.client';
import { useEffect, useRef, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import styles from 'styles/client.module.scss';
import JobCard from '@/components/client/card/job.card';

const ClientJobPage = (props: any) => {
    const [searchText, setSearchText] = useState("");
    return (
        <div className={styles["container"]} style={{ marginTop: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchClient
                        setSearchText={setSearchText}
                    />
                </Col>
                <Divider />

                <Col span={24}>
                    <JobCard
                        showPagination={true}
                        searchText={searchText}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ClientJobPage;